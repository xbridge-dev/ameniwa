{
  options: {
    attribution: '雨庭', minZoom: 2, maxNativeZoom: 2, maxZoom: 24
  },
  geojsonOptions: {
    pointToLayer: function (feature, latlng) {
      var iconUrl = "https://github.com/xbridge-dev/ameniwa/blob/6de1c4c3565219cd4e778f92439e3159f8f69f3c/assets/ameniwa20.jpg";
      var iconSize = [20, 20];    // アイコンのサイズ
      var iconAnchor = [10, 18];  // 指示点の位置（左上が基準）

      var z = GSI.GLOBALS.map.getZoom();

      switch (z) {
        case 16:
          iconUrl = "https://github.com/xbridge-dev/ameniwa/blob/6de1c4c3565219cd4e778f92439e3159f8f69f3c/assets/ameniwa27.jpg";
          iconAnchor[0] = 12;
          iconAnchor[1] = 24;
          iconSize[0] = 27;
          iconSize[1] = 27;
          break;
        case 17:
        case 18:
          iconUrl = "https://github.com/xbridge-dev/ameniwa/blob/6de1c4c3565219cd4e778f92439e3159f8f69f3c/assets/ameniwa50.jpg";
          iconAnchor[0] = 22;
          iconAnchor[1] = 45;
          iconSize[0] = 50;
          iconSize[1] = 50;
          break;
        default:
          break;
      }


      var myIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: iconSize,
        iconAnchor: iconAnchor
      });

      return L.marker(latlng, { icon: myIcon });

    },
    onEachFeature: function(feature, layer) {
      var props = {};
      props["name"] = "雨庭名";
      props["description"] = "説明";

      var s = "<table>";
      var r = "";
      var iw, ih;
      for (name in feature.properties) {
        if (!name.match(/^_/)) {
          if (name == "name") {
            s += "<tr><th colspan='2' style='font-size:14px; font-weight:bold; color:#000000; text-align:center;'>" + feature.properties[name] + "</th></tr>";
          }
          else if (name == "image_url") {
            r = feature.properties[name];

          }
          else {
            if (props[name]) {
              s += "<tr><td style='vertical-align:top; font-size:14px; color:#000000; min-width:60px; width:60px;'>" + props[name] + ":</td>"
                + "<td style='font-size:14px; color:#000000;width:160px;'>" + feature.properties[name] + "</td></tr>";
              // s += "<tr><td style='vertical-align:top; font-size:14px; color:#000000; width:100px;'>" + props[name] + ":</td>"
              //     + "<td style='font-size:14px; color:#000000;width:250px;'>" + feature.properties[name] + "</td></tr>";
            }
            else {
              if (name == "ImageWidth") {
                iw = parseInt(feature.properties[name]);
              }
              if (name == "ImageHeight") {
                ih = parseInt(feature.properties[name]);
              }
            }

          }
        }

      }
      var tb = this.createTableData(feature);

      if (r != "") {

        s += "<tr>"
          + "<td style='font-size:14px; color:#000000;text-align:center;' colspan=2 >" + "<div><a onclick=\"dslorethumbnail_click('" + tb + "')\" href='javascript:void(0)'><img style='border: 2px solid #00f' src='" + r
          + "' alt='" + r;
        // s += "<tr>" 
        // + "<td style='font-size:14px; color:#000000;text-align:center;' colspan=2 >" + "<div style='width:200px;'><a onclick=\"dslorethumbnail_click('" + tb + "')\" href='javascript:void(0)'><img style='border: 2px solid #00f' src='" + r
        // + "' alt='" + r; 
        if (iw > ih) {
          var iih = ih * 200 / iw;
          iih = Math.floor(iih);
          s += "' width='200px' height='" + iih + "px'>";
        }
        else {
          var iiw = iw * 200 / ih;
          iiw = Math.floor(iiw);
          s += "' width='" + iiw + "px' height='200px'>";
        }
        s += "</img></a></div>" + "</td></tr>";
        s += "<tr><td style='text-align:center; font-size:11px; color:#0000ff;' colspan=2>詳細説明は画像をクリック</td>"
        s += "</table>";

      }

      layer.bindPopup(s, { maxWidth: 220 });

    },
    createTableData: function(feature) {
      var x = "";
      for (name in feature.properties) {
        if (name[0] != "_") {
          x += name + "\\\\" + feature.properties[name] + "\\\\";
        }
      }
      return x;
    }
  }

}
