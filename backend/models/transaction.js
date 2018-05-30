class Transaction{
    constructor(id, locationId, price, buyer, seller, submissionDate, approvalDate, status) {
        this.Id = id;
        this.LocationId = locationId;
        this.Price = price;
        this.Buyer = buyer;
        this.Seller = seller;
        this.SubmissionDate = submissionDate;
        this.ApprovalDate = approvalDate;        
        this.Status = status;
    }
}

var TransactionStatus = {
    Request: 0,
    Approval: 1,
    Reject: 2
};

module.exports = {Transaction, TransactionStatus};
