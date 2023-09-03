Supplier.create = (newSupplier, result) => {
    Supplier.create(newSupplier, (err, data) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("created supplier:", data);
        result(null, data);
    });
};

Supplier.getAll = result => {
    Supplier.find({}, (err, data) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("suppliers:", data);
        result(null, data);
    });
};

Supplier.findById = (supplierId, result) => {
    Supplier.findById(supplierId, (err, data) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        if (!data) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("found supplier:", data);
        result(null, data);
    });
};

Supplier.updateById = (id, supplierData, result) => {
    Supplier.findByIdAndUpdate(id, supplierData, { new: true }, (err, data) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        if (!data) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated supplier:", data);
        result(null, data);
    });
};

Supplier.delete = (id, result) => {
    Supplier.findByIdAndDelete(id, (err, data) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        if (!data) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted supplier with id:", id);
        result(null, data);
    });
};

Supplier.removeAll = result => {
    Supplier.deleteMany({}, (err, data) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log(`deleted all suppliers`);
        result(null, data);
    });
};

module.exports = Supplier;
