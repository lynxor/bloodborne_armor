function CalcModel(){
    var that = this;
    that.all_attrs = ['name'].concat(attrs);
    that.weightFactor = ko.observable("1");
    that.chest = chest;
    that.gloves = gloves;
    that.helmet = helmet;
    that.legs = legs;

    that.c_chest = ko.observableArray(chest);
    that.c_legs = ko.observableArray(legs);
    that.c_gloves = ko.observableArray(gloves);
    that.c_helmet = ko.observableArray(helmet);
    that.items = ['helmet', 'chest', 'legs', 'gloves'];
    that.implementations = [
        {label: "Sort", value: bestFor_SORT},
        {label: "Weighted", value: bestFor_WEIGHTED}
    ];
    that.implementation = ko.observable(that.implementations[0]);

    that.selectedOrder = ko.observableArray(attrs);

    function selected_items(){
        return {chest: that.c_chest(),
                legs: that.c_legs(),
                gloves: that.c_gloves(),
                helmet: that.c_helmet()};
    }

    that.calc_result = ko.computed(function(){
       return best(selected_items(), that.selectedOrder(), that.implementation().value);
    });
    that.calc_total = ko.computed(function(){
        var totals = total(that.calc_result());
        totals.name = "Total";
        return totals;
    });
}

$(function(){
   ko.applyBindings(new CalcModel());
});