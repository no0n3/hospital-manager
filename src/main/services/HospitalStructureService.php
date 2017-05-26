<?php

namespace app\main\services;

use app\core\db\DBConnection;

class HospitalStructureService {
    const TYPE_HOSPITAL   = 'hospital';
    const TYPE_CLINIC     = 'clinic';
    const TYPE_DEPARTMENT = 'department';
    const TYPE_CABINET    = 'cabinet';

    private $hospitalService;

    public function __construct(HospitalService $hospitalService) {
        $this->hospitalService = $hospitalService;
    }

    public function getAll($type, $parentIds) {
        if (is_numeric($parentIds)) {
            $parentIds = [$parentIds];
        }
        if (!$this->isValidType($type, true) || !is_array($parentIds) || empty($parentIds)) {
            return false;
        }

        $parentType = $this->getParentStructure($type);
        $stmt = DBConnection::get()->query("SELECT * FROM `{$type}` WHERE `is_deleted` = 0 AND `{$parentType}_id` IN (" . implode(', ', $parentIds) . ") ORDER BY `created_at` DESC");

        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (empty($result)) {
            $result = [];
        }

        return $result;
    }

    public function getByIdUserIdAndType($id, $userId, $type) {
        if (!is_numeric($id) || !is_numeric($userId) || !$this->isValidType($type)) {
            return null;
        }

        $stmt = DBConnection::get()->query("SELECT `id`, `name`, `alt_name`, `description` FROM `{$type}` WHERE `id` = {$id} AND `user_id` = {$userId} AND `is_deleted` = 0");

        $result = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (empty($result)) {
            $result = null;
        } else {
//            $result['structure'] = $this->getStructure($result['id']);
        }

        return $result;
    }

    public function getByIdAndType($id, $type) {
        if (!is_numeric($id) || !$this->isValidType($type)) {
            return null;
        }

        $stmt = DBConnection::get()->query("SELECT `id`, `name`, `alt_name`, `description` FROM `{$type}` WHERE `id` = {$id} AND `is_deleted` = 0");

        $result = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (empty($result)) {
            $result = null;
        } else {
            $result['structure'] = $this->hospitalService->getStructure($result['id'], $type);

            if (null === $result['structure']) {
                return null;
            }
        }

        return $result;
    }

    public function delete($id, $userId, $type) {
        if (!is_numeric($id) || !is_numeric($userId) || !$this->isValidType($type)) {
            return false;
        }

        return 0 < $stmt = DBConnection::get()->execute("UPDATE `{$type}` SET `is_deleted` = 1 WHERE `id` = {$id} AND `user_id` = {$userId}");
    }

    public function create($data, $type, $userId, $addTo) {
        if (!$this->isValidHospitalData($data) || !$this->isValidType($type) || !is_numeric($userId)|| !is_numeric($addTo)) {
            return false;
        }

        $parentType = $this->getParentStructure($type);

        if (false === $this->isUserOwner($parentType, $addTo, $userId)) {
            return false;
        }

        $stmt = DBConnection::get()->prepare("INSERT INTO `{$type}` (`name`, `alt_name`, `description`, `user_id`, `{$parentType}_id`, `created_at`) VALUES (:name, :alt_name, :description, :user_id, :parent_id, :created_at)");

        return 0 < $stmt->execute([
            ':name'        => $data['name'],
            ':alt_name'    => $data['alt_name'],
            ':description' => $data['description'],
            ':user_id'     => $userId,
            ':parent_id'   => $addTo,
            ':created_at'  => time(),
        ]);
    }

    public function edit($data, $userId, $id, $type) {
        if (!$this->isValidHospitalData($data) ||
            !is_numeric($userId) ||
            !is_numeric($id) ||
            !$this->isValidType($type)
        ) {
            return false;
        }

        $stmt = DBConnection::get()->prepare("UPDATE `{$type}` SET `name` = :name, `alt_name` = :alt_name, `description` = :description WHERE `id` = :id AND `user_id` = :user_id");

        return 0 < $stmt->execute([
            ':name'        => $data['name'],
            ':alt_name'    => $data['alt_name'],
            ':description' => $data['description'],
            ':id'          => $id,
            ':user_id'     => $userId,
        ]);
    }

    private function isUserOwner($type, $id, $userId) {
        if (!$this->isValidType($type, true) || !is_numeric($id) || !is_numeric($userId)) {
            return false;
        }

        $stmt = DBConnection::get()->query("SELECT `id` FROM `{$type}` WHERE `id` = {$id} AND `user_id` = {$userId} AND `is_deleted` = 0");

        $result = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (empty($result)) {
            return false;
        } else {
            return true;
        }
    }

    private function isValidHospitalData(array $data = []) {
        return isset($data['name']) && '' !== trim($data['name']) &&
            isset($data['alt_name']) && '' !== trim($data['alt_name']) &&
            isset($data['description']) && '' !== trim($data['description']);
    }

    public function isValidType($type, $withRootType = false) {
        $types = $this->getTypes();

        if ($withRootType) {
            $types = array_merge($types, [static::TYPE_HOSPITAL]);
        }

        return in_array($type, $types);
    }

    public function getTypes() {
        return [
            static::TYPE_CLINIC,
            static::TYPE_DEPARTMENT,
            static::TYPE_CABINET,
        ];
    }

    public function getParentStructure($type) {
        $result = null;

        if (static::TYPE_CLINIC === $type) {
            $result = static::TYPE_HOSPITAL;
        } else if (static::TYPE_DEPARTMENT === $type) {
            $result = static::TYPE_CLINIC;
        } else if (static::TYPE_CABINET === $type) {
            $result = static::TYPE_DEPARTMENT;
        }

        return $result;
    }

}
