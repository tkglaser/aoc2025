start
  = h:machine t:(eol machine)* { return [h, ...t.map(item => item[1])] }

machine
  = ind:indicators _ buttons:(button _)* j:joltage { return { indicators: ind, buttons: buttons.map(b => b[0]), joltage:j } }

indicators
  = "[" lights:indicator_light+ "]" { return lights }

indicator_light
  = "." / "#"

button
  = "(" h:int t:("," int)* ")" { return [h, ...t.map(i => i[1])]  }

joltage
  = "{" h:int t:("," int)* "}" { return [h, ...t.map(i => i[1])]  }
  
int "integer"
  = [0-9]+ { return +text(); }

_ "whitespace"
  = " "+
  
eol
  = "\n"