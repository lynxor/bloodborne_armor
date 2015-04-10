
function best(all_items, attr_order, implementation, weight_factor){
    console.log("doing calc");
  var sort_order = _.clone(attr_order).reverse();
  return {chest: implementation(all_items.chest, sort_order, weight_factor),
          gloves: implementation(all_items.gloves, sort_order, weight_factor),
          helmet: implementation(all_items.helmet, sort_order, weight_factor),
          legs: implementation(all_items.legs, sort_order, weight_factor)};
}

function bestPrint(attr_order){
    var result = best(attr_order);
    _.each(result, function(v, k){
        result[k] = v.name;
    });
    return result;
}



function bestFor_SORT(items, attr_order){
    _.each(attr_order, function(attr){
        items = _.sortBy(items, attr).reverse();
    });
    return items[0];
}

function bestFor_WEIGHTED(items, attr_order, weight_factor){
    if(!weight_factor){
        weight_factor = 1;
    }
    var sorted =_.sortBy(items, function(item){
        var score = _.reduce(_.range(attr_order.length), function(memo, index){
            return memo + ((attr_order.length - index) * item[attr_order[index]] * weight_factor);
        }, 0);
        item.score = score;
        return score;
    }).reverse();

    return _.first(sorted);
}

function total(result){
    return _.reduce(attrs, function(memo, attr){
       memo[attr] = _.reduce(_.values(result), function(memo, item){ return memo + item[attr]}, 0);
       return memo;
    }, {});
}
