Vue.config.devtools = true;
var charts = new Vue ({
 
  delimiters: ['[[', ']]'],
  el : "#charts",
  data: {
    template : `<table>
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
    </table>`
  },
  methods: {
    updateTable () {
      let object = this;
      $.ajax( "/stats/" )
      .done(function(resp) {
        resp = $.parseJSON(resp);
        $("#charts").empty().append(object.template);
        for (let i = 0; i < resp.length; i++) {
            let dataRow = resp[i];
            let htmlRow = $("<tr />");
            for (let td = 0; td < dataRow.length; td++) {
                var trCellDataClass = "";
                if (td===6){
                  var trCellData=parseFloat(dataRow[td]);
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
            }
            $("#charts tbody").append(htmlRow);
        }
      })
      .fail(function() {
        alert( "error" );
      });
    }
  },
  created () {
    this.updateTable();
  },
  computed: {
  }
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
    created () {
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