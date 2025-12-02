start
  = h:range t:("," range)* { return [h, ...t.map(item => item[1])] }

range
  = min:int "-" max:int { return { min, max } }
  
int "integer"
  = [0-9]+ { return +text(); }

_ "whitespace"
  = " "+
  
eol
  = "\n"