/**
 * name: textBookController
 * author: Anuj Gupta
 * Date: 26-09-2017
 */

'use strict';

describe('Controller: TextBookController', function() {
    // load the controller's module
    beforeEach(module('playerApp'));

    var failedResponce = {
        "id": "api.content.create",
        "ver": "1.0",
        "ts": "2017-09-26T18:36:56.047Z",
        "params": {
            "resmsgid": "ac55bff0-a2e9-11e7-bec3-f181544afb13",
            "msgid": null,
            "status": "failed",
            "err": "ERR_CONTENT_CREATE_FIELDS_MISSING",
            "errmsg": "Required fields for create content are missing"
        },
        "responseCode": "CLIENT_ERROR",
        "result": {}
    };

    var successResponce = {
        "id": "api.content.create",
        "ver": "1.0",
        "ts": "2017-09-26T18:36:08.221Z",
        "params": {
            "resmsgid": "8fd414d0-a2e9-11e7-bec3-f181544afb13",
            "msgid": "8fca50d0-a2e9-11e7-bfa6-ef4d4c0ba89e",
            "status": "successful",
            "err": null,
            "errmsg": null
        },
        "responseCode": "OK",
        "result": {
            "content_id": "do_2123408457949265921231",
            "versionKey": "1506450902701"
        }
    };

    var contentService,
        scope,
        rootScope,
        textBookController,
        $q,
        deferred,
        timeout;

    beforeEach(inject(function($rootScope, $controller) {
        $controller('AppCtrl', {
            $rootScope: $rootScope,
            $scope: $rootScope.$new()
        });
    }));

    // Initialize the controller and a mock scope
    beforeEach(inject(function($rootScope, $controller, _contentService_, _$q_, _$timeout_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        contentService = _contentService_;
        $q = _$q_;
        timeout = _$timeout_;
        deferred = _$q_.defer();

        textBookController = $controller('TextBookController', {
            $rootScope: rootScope,
            $scope: scope,
            contentService: contentService
        });
    }));

    it("Initialize model", function() {
    	spyOn(textBookController, 'initializeModal').and.callThrough();
        textBookController.initializeModal();
        expect(textBookController.showCreateTextBookModal).toBe(true);
        timeout.flush(10);
    });

    describe('Create textBook', function() {
        it('create service ', function () {
            var contentData = {
                content : {
                	name : "test textBook"
                }
            };
            spyOn(contentService, 'create').and.callThrough();
            contentService.create(contentData);
            expect(contentService.create).toBeDefined();
        });

        it('success', function() {
            var contentData = {
                name : "Test"
            };
            spyOn(contentService, 'create').and.returnValue(deferred.promise);
            deferred.resolve(successResponce);
            spyOn(textBookController, 'saveMetaData').and.callThrough();
            textBookController.saveMetaData(contentData);
            scope.$apply();
            var response = contentService.create().$$state.value;
            expect(response.result).not.toBe(undefined);
        });

        it('failed due to missing required field', function() {
            var contentData = {
                content : {
                	
                }
            };
            spyOn(contentService, 'create').and.returnValue(deferred.promise);
            deferred.resolve(failedResponce);
            spyOn(textBookController, 'saveMetaData').and.callThrough();
            textBookController.saveMetaData(contentData);
            timeout.flush(2000);
            scope.$apply();
            var response = contentService.create().$$state.value;
            expect(response).not.toBe(undefined);
        });

        it('failed due to external error', function() {
            var contentData = {
                content: {}
            };
            spyOn(contentService, 'create').and.returnValue(deferred.promise);
            deferred.reject();
            spyOn(textBookController, 'saveMetaData').and.callThrough();
            textBookController.saveMetaData(contentData);
            timeout.flush(2000);
            scope.$apply();
        });
    });
});