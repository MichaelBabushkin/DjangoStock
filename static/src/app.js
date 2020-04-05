
$(document).ready(() =>{
    $.ajax( "/stats/" )
  .done(function(resp) {
    resp = $.parseJSON(resp);
    let table = `<table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Symbol</th>
        <th>Stock Market</th>
        <th>Last Deal</th>
        <th>Last Rate</th>  
        <th>Daily Change</th>
        <th>Daily Change in %</th>
        <th>Trade Volume</th>
        <th>Daily Max</th>
        <th>Daily Min</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
    <tfoot>
      <tr>
        <td>Sum</td>
        <td>$180</td>
      </tr>
    </tfoot>
  </table>`;


    $("#charts").empty().append(table);


    for (let i = 0; i < resp.length; i++) {
        let dataRow = resp[i];
        let htmlRow = $("<tr />");
        for (let td = 0; td < dataRow.length; td++) {
            var trCellDataClass = "";
            if (td===6){
                var trCellData=parseFloat(dataRow[td]);
              // switch(trCellData){
              //     // case trCellData>5.0:
              //     // trCellDataClass="bigPlus";
              //     // break;
              //     case trCellData>0&&trCellData<=5.0:
              //     trCellDataClass="smallPlus";
              //     break;
              //     case trCellData<0&&trCellData>-5.0:
              //     trCellDataClass="smallMinus";
              //     break;
              //     case trCellData<=-5.0:
              //     trCellDataClass="smallPlus";
              //     break;
              //     default:
              //     trCellDataClass="zeroValue";
              //     break;
            
              if ( trCellData>5) {
                trCellDataClass="bigPlus";
              } else if (trCellData>0&&trCellData<=5.0) {
                trCellDataClass="smallPlus";
              }else if (trCellData<0&&trCellData>-5.0) {
                trCellDataClass="smallMinus";
              }else if (trCellData<=-5.0) {
                trCellDataClass="bigMinus";
              }else{
                trCellDataClass="zeroValue";
              }
            
              $(htmlRow).append("<td class="+ trCellDataClass +">" + dataRow[td] + "</td>");
            } 
            else {
              $(htmlRow).append("<td >" + dataRow[td] + "</td>");
            }
            // if trCellData.length

          
        }
        $("#charts tbody").append(htmlRow);
    }
    
  })
  .fail(function() {
    alert( "error" );
  });
});
var navbar = new Vue({
    delimiters: ['[[', ']]'],
    el : "nav",
    data: function () {
        return {
            title: "S&P 500 Market",
            buttons : [
                {
                    text:"Real Estate", 
                    href: "#home"
                },
                {
                    text: "Contact", 
                    href: "#contact"
                }
            ]
         };
    },
    beforeCreate () {
        Vue.config.devtools = true;
    },
    created() {
//
      },
      methods: {
//
      },
      computed: {
        updateMenu() {
          return this.buttons;
        }
      }
  });