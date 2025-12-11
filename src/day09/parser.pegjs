start
  = h:coord t:(eol coord)* { return [h, ...t.map(item => item[1])] }

coord
  = x:int "," y:int { return [x,y] }
  
int "integer"
  = [0-9]+ { return +text(); }

_ "whitespace"
  = " "+
  
eol
  = "\n"