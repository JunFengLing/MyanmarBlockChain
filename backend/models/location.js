class Location{
    constructor(id, region, district, township, villageTract, block, holding, owner) {
        this.Id = id;
        this.Region = region;
        this.District = district;
        this.Township = township;
        this.VillageTract = villageTract;
        this.Block = block;
        this.Holding = holding;
        this.Owner = owner;
        this.Transactions = [];
    }
}

module.exports = Location;