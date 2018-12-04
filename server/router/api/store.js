import express from 'express';
const Stores = require('../../models/stores');
const reponseError = require('../common/responseError');
const authMiddleware = require('../../middlewares/auth');

export let router = express.Router();

router.use('/store', function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
//router.use('/', authMiddleware);

/**
 * GET /api/store/list
 *
 * @author seonhyungjo
 * @summary 모든 지점 정보 가져오기
 * @private
 * @memberof Admin
 * @param
 * @see None
 * @returns [{branchCode, branchName}, {branchCode, branchName}]
 */
router.get('/store/list', function(req, res) {
    Stores.findAll()
        .then(store => {
            if (!store) throw new Error("Can't find stores");
            res.status(200).send(store);
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'NOT_FIND_ODER');
        });
});

/**
 * POST /api/store
 *
 * @author seonhyungjo
 * @summary 지점 정보 추가하기
 * @private
 * @memberof Admin
 * @param body: 지점정보 { branchCode, branchName }
 * @see None
 * @returns «Query»
 */
router.post('/store', function(req, res) {
    Stores.create(req.body)
        .then(store => {
            res.status(200).send({ success: '0000' });
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'UPDATE_ODER_ERROR');
        });
});

/**
 * PUT /api/store/:branchCode
 *
 * @author seonhyungjo
 * @summary 지점 정보 수정하기
 * @private
 * @memberof Admin
 * @param branchCode: 지점코드
 * @param body: 지점정보 { branchCode, branchName }
 * @see None
 * @returns «Query»
 */
router.put('/store/:branchCode', function(req, res) {
    Stores.findOneAndUpdateNew(req.params.branchCode, req.body)
        .then(store => {
            if (!store) throw new Error("Can't find branchCode");
            res.status(200).send({ success: '0000' });
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'UPDATE_ODER_ERROR');
        });
});

/**
 * DELETE /api/store/:branchCode
 *
 * @author seonhyungjo
 * @summary 지점 정보 삭제하기
 * @private
 * @memberof Admin
 * @param branchCode: 지점코드
 * @see None
 * @returns «Query»
 */
router.delete('/store/:branchCode', function(req, res) {
    Stores.findStoreByBranchcode(req.params.branchCode)
        .then(store => {
            if (!store) throw new Error("Can't find branchCode");
            return Stores.deleteByBranchCode(req.branchCode);
        })
        .then(() => {
            res.status(200).send({ success: '0000' });
        })
        .catch(err => {
            console.log(err);
            reponseError(res, 'DELETE_ODER_ERROR');
        });
});
