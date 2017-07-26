import superagent from 'superagent';

const url = 'http://192.168.0.51:3000';

const request = {
    fetchComports: (callback) => {
        superagent
            .get(url + '/api/v1/comports')
            .end((err, res) => {
                if (err) {
                    return callback(err);
                }

                const comports = JSON.parse(res.text).comports;

                callback(err, comports);
            });
    },
    fetchDevices: (callback) => {
        superagent
            .get(url + '/api/v1/devices')
            .end((err, res) => {
                if (err) {
                    return callback(err);
                }

                const devices = JSON.parse(res.text).devices;

                callback(err, devices);
            });
    },
    setComport: (comName, callback) => {
        superagent
            .post(url + '/api/v1/comports')
            .send({comName: comName})
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) {
                    return callback(err);
                }

                const parsedRes = JSON.parse(res.text);
                const errMessage = parsedRes.err;
                const success = parsedRes.success;

                callback(errMessage, success);
            });
    },
    toggleDevice: (command, callback) => {
        superagent
            .post(url + '/api/v1/performAction')
            .send(command)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) {
                    return callback(err);
                }

                const parsedRes = JSON.parse(res.text);
                const errMessage = parsedRes.err;
                const success = parsedRes.success;

                callback(errMessage, success);
            });
    }
};

export default request;
