angular.module('tramappApp')
  .service('DataService', ['$http', '$interval', function ($http, $interval) {


    var self = this;


    self.data = [];

    var timer = null;


    /**
     * Returns a stop from stored data by ID, or null if it is not found.
     */
    self.getStopById = function (id) {

      var found = false;
      var stop = null;
      for (var i = 0; i < self.data.length && !found; i++) {
        if (self.data[i].id == id) {
          found = true;
          stop = self.data[i];
        }
      }
      return stop;
    };


    function compareStops(a,b) {
      a = parseInt(a.id);
      b = parseInt(b.id);
       if (a < b)
        return -1;
      else if (a> b)
        return 1;
      else
        return 0;
    }


    /**
     * Retrieves data for all stops. Data is updated at server every 2 minutes.
     */
    self.updateData = function () {

      return $http.get('http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/tranvia.json?srsname=utm30n')
        .then(function success(response) {

          if(response.data.totalCount>0){
            //Data retrieved ok
            self.data = response.data.result;

            //Sort alphabetically by title
            self.data.sort(compareStops);

            //Attach direction
            for(var i = 0; i < self.data.length;i++){

              var lastCharOfId = self.data[i].id.slice(-1);
              if(lastCharOfId=="1"){
                self.data[i].direction = "Mago de Oz";
              }
              else if(lastCharOfId=="2"){
                self.data[i].direction = "Avda. Academia";
              }
              else{
                console.err("Unknown direction " + lastCharOfId);
                self.data[i].direction = "";
              }

            }

          }
          else{
            console.error("Totalcount returned by webservice is 0!");
          }

          return self.data;
        },function error(response){
          //Error retrieving data
          console.error("Error retrieving data: " + response);
          return null;
        });

    };


    /**
     * Starts a new auto update timer every msPeriod ms.
     * When msPeriod ms pass, data is updated and "periodicCallback" function is
     * called with data argument that is the list of stops or null if an error has ocurred.
     */
    self.startAutoUpdate = function (msPeriod, periodicCallback) {


      self.cancelAutoUpdate();

      timer = $interval(function () {

        self.updateData()
          .then(function (data) {
            periodicCallback(data);
          });

      }, msPeriod);


    };


    /**
     * Cancels an auto-update timer if exists.
     */
    self.cancelAutoUpdate = function () {
      if (timer != null) {
        $interval.cancel(timer);
      }
    };


    self.stopData = function (stopID) {

      return $http({
        method: 'GET',
        url: 'http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/tranvia/' + stopID + '.json?srsname=wgs84'
      }).then(function successCallback(response) {

        return response.data;
        /*return {
         "destinos":
         [
         {"linea":"L1","destino":"ACADEMIA","minutos":1},
         {"linea":"L1","destino":"ACADEMIA","minutos":12}
         ],
         "mensajes": ["Un mensaje jaja","Otro mensaje jeje"]
         }*/
      }, function errorCallback(response) {
        return null;
      });
    }


  }]);
