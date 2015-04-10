var _ = require("underscore"),
    fs = require("fs"),
        parse = require('csv-parse');


function transform(filename){
    var fileContent = fs.readFileSync(filename);
        parse(fileContent, {columns: true}, function(err, output) {
            var data = _.map(output, function(record){
                 _.each(record, function(v, k){
                    if(k != 'name') {
                        record[k] = parseInt(record[k]);
                    }
                });
                return record;
            });
            console.log(JSON.stringify(data));
        });
}
//main
(function(){
    _.each(["chest.csv", "gloves.csv", "helmet.csv", "legs.csv"], function(f){
       transform("data/"+ f);
    });
})();

