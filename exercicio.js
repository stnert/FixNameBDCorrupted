$(document).ready(function() {
          
  String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
      retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
  };

  function round(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0)
      return Math.round(value);

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
      return NaN;

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
  }

  function keyExists(obj, key) {
    return obj[key];
  }

  function compareId(a,b) {
    if (a.id < b.id)
      return -1;
    if (a.id > b.id)
      return 1;
    return 0;
  }

  function compareName(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  function sumValue(arr) {
    var result = arr.reduce(function(acc, val){
        var o = acc.filter(function(obj){
            return obj.category==val.category;
        }).pop() || {category:val.category, price:0};
        
        o.price += val.price;
        acc.push(o);
        return acc;
    },[]);
    var finalresult = result.filter(function(item, i, a) {
      return i == a.indexOf(item);
    });

    return finalresult;
  }

  //objs.sort(compareId);
  
  $.ajax({
    url: "broken-database.json",
    success: function (data) {
      //console.log(data);
      $.each( data, function( key, val ) {
        val["name"] = val.name.allReplace({'æ': 'a', '¢': 'c','ø':'o','ß':'b'});
      });
      //jsonObj = data;
      dataObj = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
      $('<a href="data:' + dataObj + '" download="resposta_ex_1.json">Download JSON Exercicio 1</a>').appendTo('#container1');
    }
  });

  $.ajax({
    url: "broken-database.json",
    success: function (data) {
      //console.log(data);
      $.each( data, function( key, val ) {
        if (typeof(val["price"]) === "string") {
          val["price"] = round(parseFloat(val["price"]),2);
        }
      });
      //jsonObj = data;
      dataObj = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
      $('<a href="data:' + dataObj + '" download="resposta_ex_2.json">Download JSON Exercicio 2</a>').appendTo('#container2');
    }
  });

  $.ajax({
    url: "broken-database.json",
    success: function (data) {
      //console.log(data);
      $.each( data, function( key, val ) {
        if (keyExists(val,"quantity") === undefined) {
          val["quantity"] = 0;
        }
      });
      //jsonObj = data;
      dataObj = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
      $('<a href="data:' + dataObj + '" download="resposta_ex_3.json">Download JSON Exercicio 3</a>').appendTo('#container3');
    }
  });

  $.ajax({
    url: "broken-database.json",
    success: function (data) {
      //console.log(data);
      $.each( data, function( key, val ) {
        val["name"] = val.name.allReplace({'æ': 'a', '¢': 'c','ø':'o','ß':'b'});

        if (typeof(val["price"]) === "string") {
          val["price"] = round(parseFloat(val["price"]),2);
        }

        if (keyExists(val,"quantity") === undefined) {
          val["quantity"] = 0;
        }
      });
      console.log(data.sort(compareId));
      console.log(data.sort(compareName));
      console.log(sumValue(data));

      $("#container2_2a1").html("<p>Ordenação por Id: <br>"+JSON.stringify(data.sort(compareId))+"</p>");
      $("#container2_2a2").html("<p>Ordenação por Nome: <br>"+JSON.stringify(data.sort(compareName))+"</p>");
      $("#container2b").html("<p>Soma de preços por categoria: <br>"+JSON.stringify(sumValue(data))+"</p>");

      //jsonObj = data;
      dataObj = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
      $('<a href="data:' + dataObj + '" download="resposta_comp.json">Download JSON Completo</a>').appendTo('#container_all');
    }
  });
});