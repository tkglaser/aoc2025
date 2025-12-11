start
  = h:vertex t:(eol vertex)* { return [h, ...t.map(item => item [1])] }
  
vertex
  = source:vertex_id ":" targets:(_ vertex_id)* { return { source, targets: targets.map(t => t[1])} }

vertex_id
  = [a-z]+ { return text(); }

int "integer"
  = [0-9]+ { return +text(); }

_ "whitespace"
  = " "+
  
eol
  = "\n"