<?php

namespace app\main\services;

use app\core\db\DBConnection;

class HospitalService {

    private $hospitalStructureService;

    public function __construct() {
        $this->hospitalStructureService = new HospitalStructureService($this);
    }

    public function getAll() {
        $stmt = DBConnection::get()->query('SELECT `id`, `name`, `alt_name`, `description`, `user_id` FROM `hospital` WHERE `is_deleted` = 0 ORDER BY `created_at` DESC');

        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (empty($result)) {
            $result = [];
        }

        return $result;
    }

    public function getByUser($userId) {
        if (!is_numeric($userId)) {
            return [];
        }

        $stmt = DBConnection::get()->query("SELECT `id`, `name`, `alt_name`, `description`, `user_id` FROM `hospital` WHERE `user_id` = {$userId} AND `is_deleted` = 0 ORDER BY `created_at` DESC");

        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (empty($result)) {
            $result = [];
        }

        return $result;
    }

    public function getById($id) {
        if (!is_numeric($id)) {
            return null;
        }

        $stmt = DBConnection::get()->query("SELECT `id`, `name`, `alt_name`, `description` FROM `hospital` WHERE `id` = {$id} AND `is_deleted` = 0 ORDER BY `created_at` DESC");

        $result = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (empty($result)) {
            $result = null;
        } else {
            $result['structure'] = $this->getStructure($result['id']);
        }

        return $result;
    }

    public function getByIdAndUserId($id, $userId) {
        if (!is_numeric($id) || !is_numeric($userId)) {
            return null;
        }

        $stmt = DBConnection::get()->query("SELECT `id`, `name`, `alt_name`, `description` FROM `hospital` WHERE `id` = {$id} AND `user_id` = {$userId} AND `is_deleted` = 0 ORDER BY `created_at` DESC");

        $result = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (empty($result)) {
            $result = null;
        } else {
            $result['structure'] = $this->getStructure($result['id']);
        }

        return $result;
    }

    public function getStructure($id, $type = HospitalStructureService::TYPE_HOSPITAL) {
        if (!is_numeric($id) || !$this->hospitalStructureService->isValidType($type, true)) {
            return null;
        }

        if (HospitalStructureService::TYPE_HOSPITAL === $type) {
            $query = "SELECT `id`, `name`, `alt_name`, `description` FROM `hospital` WHERE `id` = {$id} AND `is_deleted` = 0";
        } else if (HospitalStructureService::TYPE_CLINIC === $type) {
            $query = "SELECT h.`id`, h.`name`, h.`alt_name`, h.`description` FROM `clinic`c JOIN `hospital` h ON c.`hospital_id` = h.id  WHERE c.`id` = {$id} AND c.`is_deleted` = 0 AND h.`is_deleted` = 0 LIMIT 1";
        } else if (HospitalStructureService::TYPE_DEPARTMENT === $type) {
            $query = "SELECT h.`id`, h.`name`, h.`alt_name`, h.`description` FROM `clinic` c JOIN `department` d ON d.clinic_id = c.id JOIN `hospital` h ON c.`hospital_id` = h.id WHERE d.`id` = {$id} AND d.`is_deleted` = 0 AND c.`is_deleted` = 0 AND h.`is_deleted` = 0 LIMIT 1";
        } else if (HospitalStructureService::TYPE_CABINET === $type) {
            $query = "SELECT h.`id`, h.`name`, h.`alt_name`, h.`description` FROM `cabinet` ca JOIN `department` d ON ca.`department_id` = d.id JOIN `clinic` c ON d.clinic_id = c.id JOIN `hospital` h ON c.`hospital_id` = h.id  WHERE ca.`id` = {$id} AND d.`is_deleted` = 0 AND c.`is_deleted` = 0 AND ca.`is_deleted` = 0 AND h.`is_deleted` = 0 LIMIT 1";
        }

        $stmt = DBConnection::get()->query($query);

        $hospital = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (empty($hospital)) {
            return null;
        }

        $hospitalId = $hospital['id'];

        $result = [];
        $clinics = $this->hospitalStructureService->getAll(HospitalStructureService::TYPE_CLINIC, $hospitalId);
        $clinicIds = [];
        foreach ($clinics as &$clinic) {
            $clinic['type'] = HospitalStructureService::TYPE_CLINIC;
            $clinic['departments'] = [];
            $clinic['is_deleted'] = $clinic['is_deleted'] ? true : false;
            $clinicIds[] = $clinic['id'];
        }

        $departments = [];
        $cabinets = [];

        if (!empty($clinicIds)) {
            $departments = $this->hospitalStructureService->getAll(HospitalStructureService::TYPE_DEPARTMENT, $clinicIds);
            $departmentIds = [];
            foreach ($departments as &$department) {
                $department['type'] = HospitalStructureService::TYPE_DEPARTMENT;
                $department['cabinets'] = [];
                $department['is_deleted'] = $department['is_deleted'] ? true : false;
                $departmentIds[] = $department['id'];
            }
            unset($department);

            if (!empty($departmentIds)) {
                $cabinets = $this->hospitalStructureService->getAll(HospitalStructureService::TYPE_CABINET, $departmentIds);

                foreach ($cabinets as &$cabinet) {
                    $cabinet['type'] = HospitalStructureService::TYPE_CABINET;
                    $cabinet['is_deleted'] = $cabinet['is_deleted'] ? true : false;
                }
            }
        }

        if (HospitalStructureService::TYPE_CLINIC === $type) {
            foreach ($clinics as &$clinic) {
                if ($id == $clinic['id']) {
                    $clinic['current'] = true;
                    break;
                }
            }
            unset($clinic);
        } else if (HospitalStructureService::TYPE_DEPARTMENT === $type) {
            foreach ($departments as &$department) {
                if ($id == $department['id']) {
                    $department['current'] = true;
                    break;
                }
            }
            unset($department);
        } else if (HospitalStructureService::TYPE_CABINET === $type) {
            foreach ($cabinets as &$cabinet) {
                if ($id == $cabinet['id']) {
                    $cabinet['current'] = true;
                    break;
                }
            }
            unset($cabinet);
        }

        foreach ($cabinets as $cabinet) {
            foreach ($departments as &$department) {
                if ($department['id'] == $cabinet['department_id']) {
                    $department['cabinets'][] = $cabinet;
                    break;
                }
            }
            unset($department);
        }
        foreach ($departments as $department) {
            foreach ($clinics as &$clinic) {
                if ($clinic['id'] == $department['clinic_id']) {
                    $clinic['departments'][] = $department;
                    break;
                }
            }
            unset($clinic);
        }

        $hospital['clinics'] = $clinics;

        $result['hospital'] = $hospital;

        return $result;
    }

    public function delete($id, $userId) {
        if (!is_numeric($id) || !is_numeric($userId)) {
            return false;
        }

        return 0 < $stmt = DBConnection::get()->execute("UPDATE `hospital` SET `is_deleted` = 1 WHERE `id` = {$id} AND `user_id` = {$userId}");
    }

    public function create($data, $userId) {
        if (!$this->isValidHospitalData($data) || !is_numeric($userId)) {
            return false;
        }

        $stmt = DBConnection::get()->prepare('INSERT INTO `hospital` (`name`, `alt_name`, `description`, `user_id`, `created_at`) VALUES (:name, :alt_name, :description, :user_id, :created_at)');

        return 0 < $stmt->execute([
                    ':name' => $data['name'],
                    ':alt_name' => $data['alt_name'],
                    ':description' => $data['description'],
                    ':user_id' => $userId,
                    ':created_at' => time(),
        ]);
    }

    public function edit($data, $userId, $id) {
        if (!$this->isValidHospitalData($data) || !is_numeric($userId) || !is_numeric($id)) {
            return false;
        }

        $stmt = DBConnection::get()->prepare('UPDATE `hospital` SET `name` = :name, `alt_name` = :alt_name, `description` = :description WHERE `id` = :id AND `user_id` = :user_id');

        return 0 < $stmt->execute([
                    ':name' => $data['name'],
                    ':alt_name' => $data['alt_name'],
                    ':description' => $data['description'],
                    ':id' => $id,
                    ':user_id' => $userId,
        ]);
    }

    private function isValidHospitalData(array $data = []) {
        return isset($data['name']) && '' !== trim($data['name']) &&
                isset($data['alt_name']) && '' !== trim($data['alt_name']) &&
                isset($data['description']) && '' !== trim($data['description']);
    }

}
