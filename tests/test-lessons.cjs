// Teste de conteúdo sem dependências extras, compatível com Windows + Node.js.
const fs=require('fs'),path=require('path'),vm=require('vm');
const dir=path.resolve(__dirname,'../src/data');
const cache={};
function load(name){
 if(cache[name])return cache[name].exports;
 const f=path.join(dir,name+'.js');
 let source=fs.readFileSync(f,'utf8');
 source=source.replace(/^import\s+\{CATEGORIES\}\s+from\s+['"]\.\/catalog['"];?\s*$/m,"const {CATEGORIES}=require('./catalog');")
   .replace(/^export\s+(const|function)\s+/gm,'$1 ');
 source+='\nmodule.exports={'+(name==='catalog'?'CATEGORIES':'LESSON_STAGES,LESSON_COUNT_PER_CATEGORY,getLessonQuestions,validateLessons')+'};';
 const module={exports:{}};cache[name]=module;
 const fn=new vm.Script('(function(require,module,exports){'+source+'\n})',{filename:f}).runInThisContext();
 fn(key=>{if(key==='./catalog')return load('catalog');throw new Error('Import desconhecido '+key)},module,module.exports);
 return module.exports;
}
const {CATEGORIES}=load('catalog');
const {LESSON_STAGES,LESSON_COUNT_PER_CATEGORY,getLessonQuestions,validateLessons}=load('lessons');
if(!validateLessons()||CATEGORIES.length!==10||LESSON_COUNT_PER_CATEGORY!==16)throw Error('Contagem inválida');
let count=0,images=0;const seen=new Set();
for(const c of CATEGORIES)for(const stage of LESSON_STAGES){
 const quiz=getLessonQuestions(c,stage.id);if(quiz.length!==4)throw Error('Nível incompleto');
 for(const q of quiz){if(seen.has(q.id)||q.choices.length!==3||q.correct<0||q.correct>2||!q.explanation)throw Error('Questão inválida: '+q.id);
 seen.add(q.id);count++;if(q.format==='image'){images++;if(q.choices[q.correct].imageCategoryId!==c.id)throw Error('Imagem errada: '+q.id)}
 }
}
console.log(`OK · ${CATEGORIES.length} categorias · ${LESSON_STAGES.length} níveis/categoria · ${count} questões · ${images} escolhas por imagem`);
