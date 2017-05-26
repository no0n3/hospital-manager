(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index.html',
    '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '    <link href="../public/css/styles.css" rel="stylesheet" type="text/css">\n' +
    '</head>\n' +
    '<body data-ng-app="app">\n' +
    '\n' +
    '    <div class="app-cont">\n' +
    '        <ng-view></ng-view>\n' +
    '    </div>\n' +
    '\n' +
    '<script src="../public/js/all.js"></script>\n' +
    '</body>\n' +
    '</html>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/home/home.html',
    '<h1>PLAY GAMES</h1>\n' +
    '{{ msg }}\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/login/login.html',
    '<div data-ng-include="headerUrl"></div>\n' +
    '<h3>Login</h3>\n' +
    '<form name="form" novalidate class="simple-form">\n' +
    '    <div>\n' +
    '        <label>E-mail: <input type="text" name="email" ng-model="user.email" ng-disabled="loading" required/></label>\n' +
    '    </div>\n' +
    '    <div>\n' +
    '        <label>Password: <input type="password" name="password" ng-model="user.password" ng-disabled="loading" required/></label>\n' +
    '    </div>\n' +
    '\n' +
    '    <input type="submit" ng-disabled="loading" ng-click="login(form)" value="Login" />\n' +
    '    <button ng-disabled="loading" ng-click="goToSignup()">sign up</button>\n' +
    '</form>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/signup/signup.html',
    '<div data-ng-include="headerUrl"></div>\n' +
    '<h3>Sign up</h3>\n' +
    '<form name="form" novalidate class="simple-form">\n' +
    '    <div>\n' +
    '        <label>Username <input type="text" name="username" ng-model="user.username" ng-disabled="loading" required/></label>\n' +
    '    </div>\n' +
    '    <div>\n' +
    '        <label>E-mail: <input type="text" name="email" ng-model="user.email" ng-disabled="loading" required/></label>\n' +
    '    </div>\n' +
    '    <div>\n' +
    '        <label>Password: <input type="password" name="password" ng-model="user.password" ng-disabled="loading" required/></label>\n' +
    '    </div>\n' +
    '    <input type="submit" ng-disabled="loading" ng-click="signup(form)" value="Sign up" />\n' +
    '    <button ng-disabled="loading" ng-click="goToLogin()">login</button>\n' +
    '</form>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/header/views/main.html',
    '<div class="header-cont">\n' +
    '    <a data-ng-href="{{ siteDomain }}">all hospitals</a>\n' +
    '    <a data-ng-if="loggedUser" data-ng-href="{{ siteDomain + \'hospital/add\' }}">create hospital</a>\n' +
    '    <a data-ng-if="loggedUser" data-ng-href="{{ siteDomain + \'hospitals/manage\' }}">mangage hospitals</a>\n' +
    '    <a data-ng-if="loggedUser" href="#" data-ng-click="logout()">logout</a>\n' +
    '    <a data-ng-if="!loggedUser" data-ng-href="{{ siteDomain + \'login\' }}">login</a>\n' +
    '    <a data-ng-if="!loggedUser" data-ng-href="{{ siteDomain + \'sign-up\' }}">signup</a>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/hospital/views/add.html',
    '<div data-ng-include="headerUrl"></div>\n' +
    '<div data-ng-if="true === added">\n' +
    '    <div class="text-info-cont">Hospital successlly added</div>\n' +
    '</div>\n' +
    '<div data-ng-if="false === added">\n' +
    '    <h3>Add hospital</h3>\n' +
    '    <form name="form" novalidate class="simple-form">\n' +
    '        <div>\n' +
    '            <label>Name: <input type="text" name="name" ng-model="hospital.name" ng-disabled="loading" required/></label>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '            <label>Alt Name: <input type="text" name="alt_name" ng-model="hospital.alt_name" ng-disabled="loading" required/></label>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '            <label>Description: <input type="text" name="description" ng-model="hospital.description" ng-disabled="loading" required/></label>\n' +
    '        </div>\n' +
    '\n' +
    '        <button ng-disabled="loading" ng-click="create(form)">create</button>\n' +
    '    </form>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/hospital/views/edit.html',
    '<div data-ng-include="headerUrl"></div>\n' +
    '<div data-ng-if="true === edited">\n' +
    '    <div class="text-info-cont">Hospital successlly edited</div>\n' +
    '</div>\n' +
    '<div data-ng-if="false === edited && false === gettingData && hospital">\n' +
    '    <h3>Edit hospital</h3>\n' +
    '    <form name="form" novalidate class="simple-form">\n' +
    '        <div>\n' +
    '            <label>Name: <input type="text" name="name" ng-model="hospital.name" ng-disabled="loading" required/></label>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '            <label>Alt Name: <input type="text" name="alt_name" ng-model="hospital.alt_name" ng-disabled="loading" required/></label>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '            <label>Description: <input type="text" name="description" ng-model="hospital.description" ng-disabled="loading" required/></label>\n' +
    '        </div>\n' +
    '\n' +
    '        <button ng-disabled="loading" ng-click="update(form)">update</button>\n' +
    '    </form>\n' +
    '    <h3>Structure</h3>\n' +
    '    <div>\n' +
    '        <div>\n' +
    '            <button data-ng-if="loggedUser" data-ng-click="addItem({id: hospital.id, type: \'hospital\'})">add clinic</button>\n' +
    '        </div>\n' +
    '        <div class="structure-level-clinic" data-ng-repeat="clinic in hospital.structure.hospital.clinics" data-ng-show="!clinic.is_deleted">\n' +
    '            <div class="structure-item">\n' +
    '                {{ clinic.name }} <span data-ng-if="clinic.type">- {{clinic.type}}</span>\n' +
    '                <div class="btns-cont">\n' +
    '                    <button data-ng-if="loggedUser && loggedUser.id == clinic.user_id" data-ng-click="addItem({id: clinic.id, type: clinic.type})">add item</button>\n' +
    '                    <button data-ng-if="loggedUser && loggedUser.id == clinic.user_id" data-ng-click="deleteItem({id: clinic.id, type: clinic.type})">delete</button>\n' +
    '                    <button data-ng-if="loggedUser && loggedUser.id == clinic.user_id" data-ng-click="editItem({id: clinic.id, type: clinic.type})">edit</button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="structure-level-deprtment" data-ng-repeat="department in clinic.departments">\n' +
    '                <div class="structure-item" data-ng-if="!department.is_deleted">\n' +
    '                    {{ department.name }} <span data-ng-if="department.type">- {{department.type}}</span>\n' +
    '                    <div class="btns-cont">\n' +
    '                        <button data-ng-if="loggedUser && loggedUser.id == department.user_id" data-ng-click="addItem({id: department.id, type: department.type})">add item</button>\n' +
    '                        <button data-ng-if="loggedUser && loggedUser.id == department.user_id" data-ng-click="deleteItem({id: department.id, type: department.type})">delete</button>\n' +
    '                        <button data-ng-if="loggedUser && loggedUser.id == department.user_id" data-ng-click="editItem({id: department.id, type: department.type})">edit</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="structure-level-cabinet" data-ng-if="!cabinet.is_deleted" data-ng-repeat="cabinet in department.cabinets">\n' +
    '                    <div class="structure-item">\n' +
    '                        {{ cabinet.name }} <span data-ng-if="cabinet.type">- {{cabinet.type}}</span>\n' +
    '                        <div class="btns-cont">\n' +
    '                            <button data-ng-if="loggedUser && loggedUser.id == cabinet.user_id" data-ng-click="deleteItem({id: cabinet.id, type: cabinet.type})">delete</button>\n' +
    '                            <button data-ng-if="loggedUser && loggedUser.id == cabinet.user_id" data-ng-click="editItem({id: cabinet.id, type: cabinet.type})">edit</button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '</div>\n' +
    '<div data-ng-if="true === gettingData">\n' +
    '    Loading...\n' +
    '</div>\n' +
    '<div data-ng-if="false === gettingData && null == hospital">\n' +
    '    No valid item found\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/hospital/views/edit_branch.html',
    '<div data-ng-include="headerUrl"></div>\n' +
    '<div data-ng-if="true === added">\n' +
    '    <div class="text-info-cont">{{ type }} successlly {{ create ? \'added\' : \'edited\' }}</div>\n' +
    '</div>\n' +
    '<div data-ng-if="false === added && validType">\n' +
    '    <h3>{{ create ? \'Create\' : \'Edit\' }} hospital {{ type }}</h3>\n' +
    '    <form name="form" novalidate class="simple-form">\n' +
    '        <div>\n' +
    '            <label>Name: <input type="text" name="name" ng-model="hospital.name" ng-disabled="loading" required/></label>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '            <label>Alt Name: <input type="text" name="alt_name" ng-model="hospital.alt_name" ng-disabled="loading" required/></label>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '            <label>Description: <input type="text" name="description" ng-model="hospital.description" ng-disabled="loading" required/></label>\n' +
    '        </div>\n' +
    '\n' +
    '        <button ng-disabled="loading" ng-click="update(form)">create</button>\n' +
    '    </form>\n' +
    '</div>\n' +
    '<div data-ng-if="false === validType">Not valid hospital structure type</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/hospital/views/hospital_list.html',
    '<div data-ng-include="headerUrl"></div>\n' +
    '<h3>{{ canManage ? \'Manage hospitals\' : \'All hospitals\'}}</h3>\n' +
    '\n' +
    '<div data-ng-if="true === loading" class="text-info-cont">\n' +
    '    Loading ...\n' +
    '</div>\n' +
    '<div data-ng-if="false === loading" class="hospital-items">\n' +
    '    <div class="hospital-item" data-ng-repeat="hospital in hospitals" data-ng-show="!hospital.is_deleted">\n' +
    '        <a data-ng-href="{{ siteDomain + \'hospital/view/\' + hospital.id }}">{{ hospital.name }}</a>\n' +
    '\n' +
    '        <div class="btns-cont" data-ng-if="canManage">\n' +
    '            <button data-ng-if="loggedUser && loggedUser.id == hospital.user_id" data-ng-click="deleteHospital({id: hospital.id})">delete</button>\n' +
    '            <button data-ng-if="loggedUser && loggedUser.id == hospital.user_id" data-ng-click="goToEditHospital({id: hospital.id})">edit</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div data-ng-if="null !== hospitals && 0 === hospitals.length">No available hospitals</div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/hospital/views/view.html',
    '<div data-ng-include="headerUrl"></div>\n' +
    '<div data-ng-if="true === loading" class="text-info-cont">\n' +
    '    Loading ...\n' +
    '</div>\n' +
    '<div data-ng-if="false === loading">\n' +
    '    <div data-ng-if="hospital">\n' +
    '        <h3>Hospital details</h3>\n' +
    '        <div>Name: {{ hospital.name }}</div>\n' +
    '        <div>Description: {{ hospital.description }}</div>\n' +
    '    </div>\n' +
    '    <div>\n' +
    '        <h3>Hospital structure</h3>\n' +
    '        <div class="structure-item current-item">\n' +
    '            <a data-ng-href="{{ siteDomain + \'hospital/view/\' + hospital.structure.hospital.id }}">{{ hospital.structure.hospital.name }}</a> <span>- hospital</span>\n' +
    '        </div>\n' +
    '        <div class="structure-level-clinic" data-ng-repeat="clinic in hospital.structure.hospital.clinics">\n' +
    '            <div class="structure-item">\n' +
    '                <a data-ng-href="{{ siteDomain + \'hospital-branch/\' + clinic.type + \'/\' + clinic.id }}">{{ clinic.name }}</a> <span data-ng-if="clinic.type">- {{clinic.type}}</span>\n' +
    '            </div>\n' +
    '            <div class="structure-level-deprtment" data-ng-repeat="department in clinic.departments">\n' +
    '                <div class="structure-item">\n' +
    '                    <a data-ng-href="{{ siteDomain + \'hospital-branch/\' + department.type + \'/\' + department.id }}">{{ department.name }}</a> <span data-ng-if="department.type">- {{department.type}}</span>\n' +
    '                </div>\n' +
    '                <div class="structure-level-cabinet" data-ng-repeat="cabinet in department.cabinets">\n' +
    '                    <div class="structure-item">\n' +
    '                        <a data-ng-href="{{ siteDomain + \'hospital-branch/\' + cabinet.type + \'/\' + cabinet.id }}">{{ cabinet.name }}</a> <span data-ng-if="cabinet.type">- {{cabinet.type}}</span>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/hospital/views/view_branch.html',
    '<div data-ng-include="headerUrl"></div>\n' +
    '<div data-ng-if="true === loading" class="text-info-cont">\n' +
    '    Loading ...\n' +
    '</div>\n' +
    '<div data-ng-if="false === loading && hospital">\n' +
    '    <div data-ng-if="hospital">\n' +
    '        <h3>Hospital {{ type }} details</h3>\n' +
    '        <div>Name: {{ hospital.name }}</div>\n' +
    '        <div>Description: {{ hospital.description }}</div>\n' +
    '    </div>\n' +
    '    <div>\n' +
    '        <h3>Structure</h3>\n' +
    '        <div class="structure-item">\n' +
    '            <a data-ng-href="{{ siteDomain + \'hospital/view/\' + hospital.structure.hospital.id }}">{{ hospital.structure.hospital.name }}</a> <span>- hospital</span>\n' +
    '        </div>\n' +
    '        <div class="structure-level-clinic" data-ng-repeat="clinic in hospital.structure.hospital.clinics">\n' +
    '            <div class="structure-item" data-ng-class="{\'current-item\' : clinic.current}">\n' +
    '                <a data-ng-href="{{ siteDomain + \'hospital-branch/\' + clinic.type + \'/\' + clinic.id }}">{{ clinic.name }}</a> <span data-ng-if="clinic.type">- {{clinic.type}}</span>\n' +
    '            </div>\n' +
    '            <div class="structure-level-deprtment" data-ng-repeat="department in clinic.departments">\n' +
    '                <div class="structure-item" data-ng-class="{\'current-item\' : department.current}">\n' +
    '                    <a data-ng-href="{{ siteDomain + \'hospital-branch/\' + department.type + \'/\' + department.id }}">{{ department.name }}</a> <span data-ng-if="department.type">- {{department.type}}</span>\n' +
    '                </div>\n' +
    '                <div class="structure-level-cabinet" data-ng-repeat="cabinet in department.cabinets">\n' +
    '                    <div class="structure-item" data-ng-class="{\'current-item\' : cabinet.current}">\n' +
    '                        <a data-ng-href="{{ siteDomain + \'hospital-branch/\' + cabinet.type + \'/\' + cabinet.id }}">{{ cabinet.name }}</a> <span data-ng-if="cabinet.type">- {{cabinet.type}}</span>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div data-ng-if="false === loading && null === hospital" class="text-info-cont">\n' +
    '    No item found\n' +
    '</div>\n' +
    '');
}]);
})();
