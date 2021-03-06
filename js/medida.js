
function Medida (valor, tipo) {

  /*if(!tipo) {
    var reg_exp = XRegExp('^(?<valor_re> [+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?[ ]*) # valor \n' +
                          '(?<tipo_re> [a-zA-Z]+)                                # tipo  \n'
                          , 'xi');

    var exp_result = XRegExp.exec(valor, reg_exp);
    this.valor = parseFloat(exp_result.valor_re);
    this.tipo = exp_result.tipo_re;
  } 
  else {*/
    this.valor = valor;
    this.tipo = tipo;
  //}
}

Medida.match = function(valor) {

  var temperaturas = "(([fF](?:[aA](?:[hH](?:[rR](?:[eE](?:[nN](?:[hH](?:[eE](?:[iI](?:[tT])?)?)?)?)?)?)?)?)?)" +
                     "|([cC](?:[eE](?:[lL](?:[sS](?:[iI](?:[uU](?:[sS])?)?)?)?)?)?)" +
                     "|([kK](?:[eE](?:[lL](?:[vV](?:[iI](?:[nN])?)?)?)?)?))";

  var cadena = XRegExp('^(\\s*)                                            # espacios \n' +
                       '(?<medida> [+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?[ ]*) # medida a tomar \n' +
                       '(?<from> ' + temperaturas + ')                     # Medida de partida \n' +
                       '(?<to>[ ]+(?:to[ ]+)?)                             # to \n' +
                       '(?<to_o> ' + temperaturas + ')                     # Medida de llegada \n' +
                       '(\\s*)$                                            # espacios en blanco \n'
                     , 'xi');

  valor = XRegExp.exec(valor, cadena);
  return valor;
}

Medida.measures = {};

Medida.convertir = function(valor) {

  var measures = Medida.measures;

  measures.c  = Celsius;
  measures.f = Fahrenheit;
  measures.k = Kelvin;
  measures.C  = Celsius;
  measures.F = Fahrenheit;
  measures.K = Kelvin;

  var match = Medida.match(valor);
  if (match) {
    var numero = match.medida,
        tipo_from = match.from.toLowerCase(),
        tipo_to = match.to_o.toLowerCase();

        numero = parseFloat(numero);
        console.log("Valor: " + numero + ", 1º Tipo: " + tipo_from + ", 2º Tipo: " + tipo_to);

          var source = new measures[tipo_from](numero); // new Fahrenheit(32)
          var target = "to" + measures[tipo_to].name; // "toCelsius"
          return source[target]().toFixed(2) + " " + measures[tipo_to].name; // "0 Celsius"
      }
      else
        return "ERROR! Try something like '4F to K or 50e1K C or 30C TO K' instead";
    };
