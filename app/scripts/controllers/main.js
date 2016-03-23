'use strict';

/**
 * @ngdoc function
 * @name tramappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tramappApp
 */
angular.module('tramappApp')
  .controller('MainCtrl', ['DataService', '$interval', '$http', '$scope', function (DataService, $interval, $http, $scope) {

    var self = this;
    self.stops = [];


    self.stopFilter = {};
    self.stopData =
    {
      title: "Titulo"
    };


    self.tituloParada = "";

    self.selectedStopId = 101; //Id of selected stop
    self.selectedStop = {}; //Selected stop data (Is updated on every data update)


    self.zaragoza = {
      lat: 41.650,
      lng: -0.89,
      zoom: 13
    };


    $http.get("data/paradas.json").success(function (data, status) {
      self.geojson = {
        data: data,
        style: {
          fillColor: "green",
          weight: 3,
          opacity: 1,
          color: 'black',
          dashArray: '2',
          fillOpacity: 0.7,

        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.NOMBRE);
          layer.on({
            mouseover: function () {
              layer.openPopup();
            },
            click: function () {
              self.selectedStopId = feature.properties.POSTE;
              self.selectedStop = DataService.getStopById(self.selectedStopId);

            },
          });
        }
      };

      //Process
      for (var i = 0; i < data.features.length; i++) {
        self.stops.push(data.features[i].properties);

      }

      //self.selectedStop = self.stops[0];
    });


    /**
     * Returns the  list of stops from DataService.
       */
    self.getStops = function () {
      return DataService.data;
    };

    /**
     * Sets the current stop to "stop" oject, modifying "selectedStop" and "selectedStopId".
     * Also, updates the led.
     * @param stop
     */
    self.setCurrentStop = function (stop) {
      self.selectedStopId = stop.id;
      self.selectedStop = stop;
      self.updateLed(stop);
    };


    /**
     * Sets the current stop to "stop" with id "stopId", modifying "selectedStop" and "selectedStopId".
     * Also, updates the led.
     */
    self.setCurrentStopById = function (stopId) {
      self.selectedStopId = stopId;
      self.selectedStop = DataService.getStopById(stopID);
      self.updateLed(stop);
    };


    /**
     * Updates the led with current data for the stop object "stop".
     */
    self.updateLed = function (stop) {
      var currentStop = stop;
      drawDestination(currentStop.destinos);
      drawMessages(currentStop.mensajes);
    };


    DataService.updateData()
      .then(function (data) {
        self.selectedStop = DataService.getStopById(self.selectedStopId);
        self.updateLed(self.selectedStop);
      });


    DataService.startAutoUpdate(30000, function () {
      //When data is updated -> update current Led.
      //Update selectedStop
      self.selectedStop = DataService.getStopById(self.selectedStopId);
      self.updateLed(self.selectedStop);
    });


    /**
     * Draws destinations (up to 2)
     * @param destinosArray
     */
    var drawDestination = function (destinosArray) {
      if (destinosArray != undefined) {

        if (destinosArray.length > 0) {
          var dest = destinosArray[0];
          $('#firstDestination').changeText(dest.linea + " " + dest.destino);
          $('#firstDestination').changeMinutes("" + dest.minutos);
        }
        if (destinosArray.length > 1) {
          var dest = destinosArray[1];
          $('#secondDestination').changeText(dest.linea + " " + dest.destino);
          $('#secondDestination').changeMinutes("" + dest.minutos);
        }

      }
      else {
        $('#firstDestination').changeText("SIN DATOS");
        $('#secondDestination').changeText("SIN DATOS");
      }


    };

    /**
     * Draws moving message.
     * @param messages
     */
    var drawMessages = function (messages) {

      if (messages && messages.length > 0) {

        var concatMessage = "";
        for (var i in messages) {
          concatMessage += messages[i] + "                 ";
        }
        $('#messages').changeText(concatMessage);
      }
    };

    var destinationOptions = {
      horizontalPixelsCount: 100,
      verticalPixelsCount: 5,
      pixelSize: 1,
      disabledPixelColor: '#404040',
      enabledPixelColor: 'red',
      pathToPixelImage: 'images/pixel.png',
      stepDelay: 50,
      fixed: true,
      runImmidiatly: true
    };

    var messagesOption = {
      horizontalPixelsCount: 100,
      verticalPixelsCount: 5,
      pixelSize: 3,
      disabledPixelColor: '#404040',
      enabledPixelColor: 'red',
      pathToPixelImage: 'images/pixel.png',
      stepDelay: 50,
      fixed: false,
      runImmidiatly: true
    };

    $('#firstDestination').leddisplay($.extend(destinationOptions, {pixelSize: 3.5}));
    $('#firstDestination').changeText("SIN DATOS");
    $('#secondDestination').leddisplay($.extend(destinationOptions, {pixelSize: 3.5}));
    $('#secondDestination').changeText("SIN DATOS");
    $('#messages').leddisplay($.extend(messagesOption, {pixelSize: 3.5}));
    $('#messages').changeText("SIN DATOS");

  }]);
