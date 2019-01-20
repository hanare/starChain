class Mempool {
    constructor() {
        this.mempool = [];
        this.timeOutRequests = [];
        this.mempoolValid = [];
        this.TimeoutRequestsWindowTime = 5 * 60 * 1000;

    }

    setRequest(walletAddress) {
        let self = this;
        let request = {};
        request.walletAddress = walletAddress;
        console.log(request);
        console.log(this.timeOutRequests)
        this.timeOutRequests[walletAddress] = setTimeout(function () {
            self.removeValidationRequest(request.walletAddress);
        }, self.TimeoutRequestsWindowTime);
        request.requestTimeStamp = (new Date().getTime().toString().slice(0, -3));
        request.message = `${request.walletAddress}:${request.requestTimeStamp}:starRegistry`
        let timeLeft = (this.TimeoutRequestsWindowTime / 1000) - 0;
        request.validationWindow = timeLeft;
        this.mempool[request.walletAddress] = request;

        console.log("Wallet request", this.mempool[request.walletAddress]);
        console.log("timeout ", this.timeOutRequests);

        return request;

    }

    updateRegistrationStatus(walletAddress) {
        this.mempool[walletAddress].registerStar = true;

    }
    addValidTranscation(validTx,walletAddress){
        this.mempoolValid[walletAddress]=validTx;
    }
    isRegisterStar(walletAddress){
        return this.mempoolValid[walletAddress].registerStar;
    }
    removeValidationRequest(walletAddress) {
        console.log("removal of request from the mempool");
        delete this.mempool[walletAddress];
        delete this.timeOutRequests[walletAddress];
    }


    requestObjectReturn(walletAddress) {
        let request = this.mempool[walletAddress];
        console.log(request);
        let timeElapse = (new Date().getTime().toString().slice(0, -3)) - request.requestTimeStamp;
        let timeLeft = (this.TimeoutRequestsWindowTime / 1000) - timeElapse;
        request.validationWindow = timeLeft;
        return request;
    }

    requestExist(walletAddress) {
        console.log("requestExist ", (this.mempool[walletAddress] !== undefined));
        return (this.mempool[walletAddress] !== undefined);
    }
}


module.exports.Mempool = Mempool;