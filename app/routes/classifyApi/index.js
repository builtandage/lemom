var mongodb = require('mongodb-curd');
var base = '1610A';
var coll = 'classify'

var addclassify = function(req, res, next) {
    var parms = req.query,
        iname = parms.iname,
        cname = parms.cname,
        type = parms.type,
        user = parms.user;
    if (!iname || !cname || !type || !user) {
        res.send({ code: 2, message: "分类信息不完整" })
    } else {
        mongodb.find(base, coll, { iname: iname, cname: cname, type: type, user: { $in: ['*', user] } }, function(result) {
            if (result.length > 0) {
                res.send({
                    code: 1,
                    message: "该分类已经存在"
                })
            } else {
                mongodb.insert(base, coll, { iname: iname, cname: cname, type: type, user: user }, function(data) {
                    if (data) {
                        res.send({
                            code: 0,
                            message: "添加分类成功"
                        })
                    } else {
                        res.send({
                            code: 3,
                            message: "添加分类失败"
                        })
                    }
                })

            }
        })
    }
}
var iconlist = function(req, res, next) {
    mongodb.find(base, coll, {}, function(result) {
        if (result.length > 0) {
            res.send({
                code: 0,
                message: "查找成功",
                data: result
            })
        } else {
            res.send({
                code: 1,
                message: "查找失败"
            })
        }
    })
}
var getclassify = function(req, res, next) {
    var parms = req.query,
        type = parms.type,
        user = parms.user;
    mongodb.find(base, coll, { type: type, user: { $in: ['*', user] } }, function(result) {
        if (result.length > 0) {
            res.send({
                code: 0,
                message: "查找成功",
                data: result
            })
        } else {
            res.send({
                code: 1,
                message: "查找失败"
            })
        }
    })
}
module.exports = {
    iconlist: iconlist,
    addclassify: addclassify,
    getclassify: getclassify
};