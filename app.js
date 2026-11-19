"use strict";

const D=['Lunes · Piernas y glúteos','Martes · Hombros y brazos A','Miércoles · Spinning + core A','Jueves · Espalda + pecho + brazos','Viernes · Spinning + core B','Sábado · Hombros + brazos B + glúteos','Domingo · Descanso'];
// [day,name,sets,low,high,base,increment,unit,type]
const E=[
[0,'Hip thrust',4,8,12,130,5,'kg','compound'],[0,'Prensa diagonal',3,8,12,150,5,'kg','compound'],[0,'Peso muerto rumano',3,8,10,60,2.5,'kg','compound'],[0,'Curl femoral',3,10,15,46,2,'lb','isolation'],[0,'Abducción cadera',2,15,20,67,2,'lb','isolation'],[0,'Gemelos en prensa',2,12,20,null,5,'kg','isolation'],
[1,'Elevaciones laterales mancuernas',4,10,15,14,1,'kg por mancuerna','isolation'],[1,'Press hombros con respaldo',2,6,10,18,2,'kg por mancuerna','compound'],[1,'Reverse pec deck',3,12,20,null,1,'unidad de máquina','isolation'],[1,'Curl inclinado',3,8,12,12,1,'kg por mancuerna','isolation'],[1,'Curl martillo',2,10,12,16,2,'kg por mancuerna','isolation'],[1,'Tríceps cuerda',2,8,12,57,5,'lb','isolation'],[1,'Extensión tríceps sobre cabeza',2,10,15,null,2.5,'unidad de máquina','isolation'],
[2,'Spinning intenso',1,45,50,null,0,'minutos','cardio'],[2,'Crunch en polea',2,10,15,null,2.5,'kg','isolation'],[2,'Pallof press',2,10,12,null,2,'unidad de máquina','core'],[2,'Dead bug',2,8,10,0,0,'peso corporal','core'],[2,'Elevación en Y',2,12,20,null,1,'kg por mancuerna','posture'],[2,'Wall slides',2,10,10,0,0,'peso corporal','posture'],
[3,'High Row',3,6,10,100,5,'kg','compound'],[3,'Jalón al pecho',3,8,12,14,1,'nivel de máquina','compound'],[3,'Remo pecho apoyado',3,8,12,90,5,'kg','compound'],[3,'Press inclinado',2,5,10,80,2.5,'kg','compound'],[3,'Press plano',1,8,10,70,2.5,'kg','compound'],[3,'Face pull',2,15,20,45,5,'lb','posture'],[3,'Curl polea',2,12,15,null,2.5,'unidad de máquina','isolation'],[3,'Tríceps cuerda',2,12,15,57,5,'lb','isolation'],
[4,'Spinning moderado',1,45,55,null,0,'minutos','cardio'],[4,'Bird dog',2,10,10,0,0,'peso corporal','core'],[4,'Plancha lateral',2,20,40,0,0,'segundos','core'],[4,'Pallof press',2,12,12,null,2,'unidad de máquina','core'],[4,'Wall slides',1,10,10,0,0,'peso corporal','posture'],[4,'Rotación externa banda',2,15,15,null,0,'banda','posture'],
[5,'Elevación lateral unilateral polea',4,12,20,null,1,'unidad de máquina','isolation'],[5,'Elevaciones laterales máquina',2,15,20,null,2.5,'unidad de máquina','isolation'],[5,'Reverse pec deck',3,12,20,null,1,'unidad de máquina','isolation'],[5,'Curl predicador',2,8,12,null,2.5,'kg','isolation'],[5,'Curl martillo polea',2,12,15,null,2.5,'unidad de máquina','isolation'],[5,'Extensión tríceps sobre cabeza',2,10,15,null,2.5,'unidad de máquina','isolation'],[5,'Tríceps cuerda',2,12,15,57,5,'lb','isolation'],[5,'Hip thrust moderado',2,10,15,100,5,'kg','compound'],[5,'Abducción cadera',2,15,20,60,2,'lb','isolation'],[5,'Jalón unilateral dorsal',2,10,15,null,2.5,'unidad de máquina','compound'],[5,'Crunch polea',2,12,15,null,2.5,'kg','isolation'],[5,'Dead bug',1,8,10,0,0,'peso corporal','core'],
[0,'Extensión de rodilla alternada con sostén',2,10,15,null,1,'unidad de máquina','rehab'],
[2,'Extensión terminal de rodilla con banda (opcional)',2,10,15,null,0,'banda','rehab']
].map((r,id)=>({id,day:r[0],name:r[1],sets:r[2],lo:r[3],hi:r[4],base:r[5],step:r[6],unit:r[7],type:r[8]}));
const KEY='entrenamiento-42-v1';let state={week:1,day:1,settings:{},logs:{},mass:{},initial:87.5,rate:.4};try{const saved=localStorage.getItem(KEY);if(saved)state={...state,...JSON.parse(saved)}}catch(e){};
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const parseDecimal=value=>{if(value===null||value===undefined||String(value).trim()==='')return null;const normalized=String(value).trim().replace(/\s/g,'').replace(',', '.');if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized))return null;const result=Number(normalized);return Number.isFinite(result)?result:null};const num=parseDecimal;const fmt=n=>n===null||!Number.isFinite(n)?'Sin definir':Number(n.toFixed(2)).toLocaleString('es-UY');
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));$('storageStatus').textContent='Guardado localmente.'}catch(e){$('storageStatus').textContent='No se pudo guardar en este navegador. Exportá una copia JSON.'}}
function target(e,w){if(['core','posture','cardio','rehab'].includes(e.type))return null;return w===8?4:w<=2?3:w<=4?2:e.type==='compound'?2:1}
function config(e){const s=state.settings[e.id]||{};return {base:s.base===undefined?e.base:num(s.base),step:s.step===undefined?e.step:Number(s.step)}}
function getLog(w,id){return state.logs[w+'_'+id]||{}}

const SERIES_A=["Abducción cadera", "Pallof press", "Dead bug", "Elevación en Y", "Wall slides", "Face pull", "Bird dog", "Plancha lateral", "Rotación externa banda", "Hip thrust moderado", "Press plano"], SERIES_C=["Hip thrust", "Prensa diagonal", "High Row", "Remo pecho apoyado", "Press inclinado", "Press hombros con respaldo"];
function method(e){if(['cardio','posture','core','rehab'].includes(e.type))return 'same';if(SERIES_C.includes(e.name)&&e.sets>1)return 'top';return SERIES_A.includes(e.name)?'same':'descending'}
function restDefault(e){if(e.type==='cardio')return 0;if(e.type==='rehab')return 75;if(['core','posture'].includes(e.type))return 60;if(['Hip thrust','Prensa diagonal','High Row','Press inclinado','Remo pecho apoyado'].includes(e.name))return 180;if(e.type==='compound')return 150;if(['Curl femoral','Elevaciones laterales mancuernas','Elevación lateral unilateral polea','Elevaciones laterales máquina','Curl predicador'].includes(e.name))return 120;return 90}
function restSeconds(e){const v=Number((state.settings[e.id]||{}).rest);return Number.isFinite(v)&&v>=0&&(state.settings[e.id]||{}).rest!==undefined?v:restDefault(e)}
function planSets(e,w){
 const c=config(e),rir=target(e,w),count=w===8?Math.max(1,Math.ceil(e.sets/2)):e.sets,style=method(e),nonLift=['core','posture','cardio','rehab'].includes(e.type);
 const base=c.base;
 let why='Objetivos iniciales orientativos. Ajustá según tu RIR y técnica.';
 let goals=Array.from({length:count},(_,i)=>{const back=style==='top'&&i>0;const weight=base===null?null:back?Math.round((base*.925)/(c.step||1))*(c.step||1):base;const reps=back?Math.min(e.hi,e.lo+2):e.lo;return {load:weight,reps,rir:nonLift?null:rir,label:style==='top'?(i===0?'Top set':'Back-off'):'Serie '+(i+1)}});
 if(w===8){
  let last=null;
  for(let k=7;k>=1;k--){const v=(getLog(k,e.id).sets||[]);if(v.length>=count&&v.slice(0,count).every(x=>num(x.load)!==null&&num(x.reps)!==null)){last=v;break}}
  goals=goals.map((g,i)=>{const ref=last&&last[i]&&num(last[i].load)!==null?Number(last[i].load):g.load;return {...g,load:ref===null?null:(nonLift?ref:Math.round(ref*.9/(c.step||1))*(c.step||1)),reps:e.lo,rir:nonLift?null:4}});
  why=last?'Descarga calculada desde tu última sesión registrada: menos series, ~10 % menos carga y RIR 4.':'Descarga estimada desde cargas iniciales: menos series, ~10 % menos carga y RIR 4.';
  return {series:goals,why,style}
 }
 if(nonLift)return {series:goals,why,style};
 for(let k=1;k<w;k++){
  const prev=getLog(k,e.id),ss=(prev.sets||[]).slice(0,e.sets);
  if(ss.length<e.sets||ss.some(x=>num(x.load)===null||num(x.reps)===null||num(x.rir)===null)){why='Sin registro completo de la semana '+k+': se conserva la última propuesta confirmada.';break}
  const pain=!!prev.pain,bad=ss.some(x=>Number(x.rir)<target(e,k));
  goals=goals.map((g,i)=>{const p=ss[i];if(!p)return g;const actualLoad=Number(p.load),actualReps=Number(p.reps),actualRir=Number(p.rir);if(pain||actualRir<target(e,k))return {...g,load:actualLoad,reps:Math.max(e.lo,Math.min(e.hi,actualReps))};return {...g,load:actualLoad,reps:Math.min(e.hi,Math.max(e.lo,actualReps+1))}});
  const allAtMax=ss.every(p=>Number(p.reps)>=e.hi&&Number(p.rir)>=target(e,k));
  if(allAtMax&&!pain&&!bad&&c.step>0){goals=goals.map(g=>({...g,load:g.load===null?null:g.load+c.step,reps:style==='top'&&g.label==='Back-off'?Math.min(e.hi,e.lo+2):e.lo}));why='Máximo del rango alcanzado en todas las series: incremento mínimo propuesto.'}
  else why=pain||bad?'Hubo molestias o RIR inferior: no se aumenta la carga.':'Progresión por serie usando su propio resultado anterior.';
 }
 return {series:goals,why,style}
}

/** Render focused forms for cardio, mobility, core and rehabilitation. */
function renderActivityCard(exercise, plan, log) {
 const isCardio=exercise.type==='cardio';
 const isTime=exercise.name==='Plancha lateral';
 const perSide=['Pallof press','Dead bug','Bird dog','Rotación externa banda','Extensión terminal de rodilla con banda (opcional)','Extensión de rodilla alternada con sostén'].some(name=>exercise.name.includes(name));
 const unit=isCardio?'Minutos':isTime?'Segundos por lado':perSide?'Reps por lado':'Repeticiones';
 const defaultReps=isCardio?exercise.lo:plan.series[0]?.reps||exercise.lo;
 const rows=plan.series.map((target,index)=>{
  const recorded=(log.sets||[])[index]||{};
  return `<div class="activity-fields"><label>Serie ${index+1}<input type="text" disabled value="${index+1}" aria-label="Serie ${index+1}"></label><label>${unit}<input data-log="reps" data-id="${exercise.id}" data-series="${index}" type="number" inputmode="numeric" min="0" placeholder="${target.reps}" value="${esc(recorded.reps??'')}"></label></div>`;
 }).join('');
 const cardioIntensity=log.intensity||'moderado';
 const intensity=isCardio?`<label>Intensidad percibida<select data-intensity="${exercise.id}"><option value="suave" ${cardioIntensity==='suave'?'selected':''}>Suave</option><option value="moderado" ${cardioIntensity==='moderado'?'selected':''}>Moderada</option><option value="intenso" ${cardioIntensity==='intenso'?'selected':''}>Intensa</option></select></label>`:'';
 const resistance=isCardio?'':`<label>Resistencia o banda (opcional)<input type="text" data-resistance="${exercise.id}" placeholder="Ej.: banda roja, 5 kg" value="${esc(log.resistance||'')}"></label>`;
 const safety=exercise.type==='rehab'?'<p class="muted">Movimientos controlados, sin forzar ni buscar el fallo. Ajustá la amplitud si hay dolor; evitá continuar ante hinchazón, bloqueo o inestabilidad.</p>':'';
 const minutesHelp=isCardio?'<p class="muted">Ingresá los minutos reales. No hay carga, repeticiones ni RIR para spinning. Para sumarlo a las calorías diarias, registrá también la actividad en el resumen diario.</p>':'<p class="muted">Registrá cada lado por separado pero anotá las repeticiones o segundos de un solo lado, no la suma de ambos. RIR no requerido.</p>';
 return `<section class="card activity-card"><div class="row"><strong>${esc(exercise.name)}</strong><span class="tag">${isCardio?'Cardio':exercise.type==='rehab'?'Rodilla':exercise.type==='core'?'Core':'Postura'}</span></div>${safety}${minutesHelp}<div class="activity-layout">${rows}</div>${intensity}${resistance}<label><input data-pain="${exercise.id}" type="checkbox" style="width:auto" ${log.pain?'checked':''}> Hubo dolor o molestias</label><label>Observaciones (opcional)<textarea data-note="${exercise.id}" rows="2" placeholder="Sensaciones, técnica, fatiga...">${esc(log.note||'')}</textarea></label><p class="muted">${(log.sets||[]).some(s=>num(s.reps)!==null)?'Datos guardados automáticamente.':'Completá los campos para guardar automáticamente.'}</p>${!isCardio&&plan.series.length>1?`<div class="rest-actions"><small class="muted">Descanso sugerido ${restFormat(restSeconds(exercise))}</small><button class="secondary rest-start" type="button" data-rest="${exercise.id}">Iniciar temporizador</button></div>`:''}</section>`;
}
function render(){const w=state.week,d=state.day;$('weeks').innerHTML=Array.from({length:8},(_,i)=>`<button data-w="${i+1}" class="${w===i+1?'active':''}">${i+1}</button>`).join('');$('day').value=String(d);$('phase').textContent=w<=2?'Adaptación':w<=4?'Acumulación':w<=7?'Progresión':'Descarga';$('dayInfo').textContent=d===6?'Día de descanso.':w===8?'Descarga: menos series y menor carga.':'RIR objetivo: '+(w<=2?'3':w<=4?'2':'2 compuestos / 1 aislados');$('exercises').innerHTML=E.filter(e=>e.day===d).sort((a,b)=>{const order=d===0?['Hip thrust','Prensa diagonal','Peso muerto rumano','Extensión de rodilla alternada con sostén','Curl femoral','Abducción cadera','Gemelos en prensa']:d===2?['Spinning intenso','Extensión terminal de rodilla con banda (opcional)']:[];const ai=order.indexOf(a.name),bi=order.indexOf(b.name);return (ai<0?100+a.id:ai)-(bi<0?100+b.id:bi)}).map(e=>{const p=planSets(e,w),log=getLog(w,e.id),c=config(e),nonLift=['core','posture','cardio','rehab'].includes(e.type);if(nonLift)return renderActivityCard(e,p,log);return `<section class="card"><div class="row"><strong>${esc(e.name)}</strong><span class="tag">${p.series.length} series</span></div><p><span class="tag">${p.style==='top'?'Top set + back-off':p.style==='same'?'Repeticiones constantes':'Carga constante · reps variables'}</span>${target(e,w)===null?'':`<span class="tag">RIR ${target(e,w)}</span>`}</p><p class="muted">${esc(p.why)}</p>${e.type==='rehab'?`<p class="muted"><strong>Trabajo complementario de rodilla: NO forzar ni buscar el fallo.</strong> ${e.name.startsWith('Extensión de rodilla')?'Alterná las piernas: una queda extendida mientras la otra ejecuta una repetición controlada, luego intercambiá. Contá las repeticiones por pierna. Usá carga liviana y no bloquees forzadamente la rodilla.':'Con banda detrás de la rodilla, extendé suavemente sin bloquear; mantené 1–2 s y regresá con control. Opcional según tolerancia.'} Evitá dolor creciente, inflamación o bloqueo; el rango debe ajustarse a tu lesión.</p>`:''}<p class="muted">Descanso entre series: <strong>${Math.floor(restSeconds(e)/60)}:${String(restSeconds(e)%60).padStart(2,'0')}</strong> min entre series efectivas.</p><div class="series"><small>Serie</small><small>Peso obj.</small><small>Reps obj.</small><small>RIR obj.</small></div>${p.series.map((t,i)=>`<div class="series"><small>${i+1} ${p.style==='top'?(i===0?'T':'B'):''}</small><strong>${t.load===null?'—':fmt(t.load)}</strong><strong>${t.reps}</strong><strong>${t.rir===null?'—':t.rir}</strong></div>`).join('')}<details><summary>Registrar cada serie y configurar</summary><div class="grid"><div><label>Carga inicial (${esc(e.unit)})</label><input data-setting="base" data-id="${e.id}" type="text" inputmode="decimal" pattern="[0-9.,]+" value="${c.base===null?'':c.base}"></div><div><label>Incremento mínimo (${esc(e.unit)})</label><input data-setting="step" data-id="${e.id}" type="text" inputmode="decimal" pattern="[0-9.,]+" value="${c.step}"></div><div><label>Descanso entre series (segundos)</label><input data-setting="rest" data-id="${e.id}" type="number" min="0" max="600" step="15" inputmode="numeric" value="${restSeconds(e)}"></div></div><p class="muted">${nonLift?'Para cardio y postura no se exige RIR.':'Anotá el peso, las repeticiones y el RIR real de cada serie. Las series de calentamiento no cuentan.'}</p><div class="series"><small>Serie</small><small>Carga real</small><small>${e.type==='cardio'?'Min':'Reps reales'}</small><small>RIR real</small></div>${p.series.map((t,i)=>{const v=(log.sets||[])[i]||{};return `<div class="series"><strong>${i+1}</strong><input aria-label="Carga serie ${i+1}" data-log="load" data-id="${e.id}" data-series="${i}" type="text" inputmode="decimal" pattern="[0-9.,]+" placeholder="${t.load===null?'—':fmt(t.load)}" value="${esc(v.load??'')}"><input aria-label="Reps serie ${i+1}" data-log="reps" data-id="${e.id}" data-series="${i}" type="number" inputmode="numeric" placeholder="${t.reps}" value="${esc(v.reps??'')}"><input aria-label="RIR serie ${i+1}" data-log="rir" data-id="${e.id}" data-series="${i}" type="number" min="0" max="10" inputmode="numeric" placeholder="${t.rir??'—'}" value="${esc(v.rir??'')}"></div>`}).join('')}<label><input data-pain="${e.id}" type="checkbox" style="width:auto" ${log.pain?'checked':''}> Hubo dolor o molestias</label><label>Observaciones</label><textarea data-note="${e.id}" rows="2" placeholder="Técnica, fatiga, sensaciones...">${esc(log.note||'')}</textarea></details><div class="rest-actions"><small class="muted">Descanso ${Math.floor(restSeconds(e)/60)}:${String(restSeconds(e)%60).padStart(2,'0')} min</small><button class="secondary rest-start" type="button" data-rest="${e.id}">Iniciar temporizador</button></div></section>`}).join('')||'<section class="card">Descanso y recuperación.</section>';$('initial').value=String(state.initial).replace('.',',');$('rate').value=state.rate;$('mass').value=state.mass[w]===undefined?'':String(state.mass[w]).replace('.',',');renderMass()}
function parseLocalizedNumber(value){const text=String(value??'').trim().replace(/\s/g,'').replace(',','.');if(!/^\d+(?:\.\d+)?$/.test(text))return null;const number=Number(text);return Number.isFinite(number)?number:null}
function renderMass(){const start=parseLocalizedNumber(state.initial)??87.5,rate=Number(state.rate),w=state.week;$('weightSummary').textContent=`Objetivo al finalizar la semana ${w}: ${fmt(start-rate*w)} kg. Objetivo al finalizar 8 semanas: ${fmt(start-rate*8)} kg.`;$('weightRows').innerHTML=Array.from({length:8},(_,i)=>`<tr><td>${i+1}</td><td>${fmt(start-rate*(i+1))} kg</td><td>${state.mass[i+1]?esc(state.mass[i+1])+' kg':'—'}</td></tr>`).join('')}
$('day').innerHTML=D.map((d,i)=>`<option value="${i}">${esc(d)}</option>`).join('');$('weeks').addEventListener('click',e=>{if(e.target.dataset.w){state.week=Number(e.target.dataset.w);save();render()}});$('day').addEventListener('change',e=>{state.day=Number(e.target.value);save();render()});$('exercises').addEventListener('change',e=>{const t=e.target,id=t.dataset.id;if(t.dataset.setting){state.settings[id]??={};state.settings[id][t.dataset.setting]=t.dataset.setting==='rest'?t.value:(num(t.value)===null?'':String(num(t.value)));save();render();return}if(t.dataset.log){const key=state.week+'_'+id;state.logs[key]??={sets:[]};const s=state.logs[key].sets;const i=Number(t.dataset.series);s[i]??={};s[i][t.dataset.log]=(t.dataset.log==='load'&&num(t.value)!==null)?String(num(t.value)):t.value;save();return}if(t.dataset.pain){const key=state.week+'_'+t.dataset.pain;state.logs[key]??={sets:[]};state.logs[key].pain=t.checked;save();return}if(t.dataset.note){const key=state.week+'_'+t.dataset.note;state.logs[key]??={sets:[]};state.logs[key].note=t.value;save();return}if(t.dataset.intensity||t.dataset.resistance){const id=t.dataset.intensity||t.dataset.resistance;const key=state.week+'_'+id;state.logs[key]??={sets:[]};state.logs[key][t.dataset.intensity?'intensity':'resistance']=t.value;save();return}});$('exercises').addEventListener('input',e=>{if(e.target.dataset.log||e.target.dataset.note||e.target.dataset.resistance){e.target.dispatchEvent(new Event('change',{bubbles:true}))}});let restTimer=null,restEnd=0,restExercise=null,restRemaining=0,restPaused=false,restName='',restActiveSince=0,restElapsed=0;
function restFormat(seconds){return Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0')}
function updateRestClock(){
 if(restExercise===null)return;
 if(!restPaused)restRemaining=Math.max(0,Math.ceil((restEnd-Date.now())/1000));
 const finished=restRemaining===0;
 $('floatRestTime').textContent=finished?'Listo':restFormat(restRemaining);
 $('floatRestName').textContent=finished?'Descanso terminado · '+restName:restName;
 $('floatRestToggle').textContent=restPaused?'Continuar':'Pausar';
 $('floatRestToggle').disabled=finished;
 document.querySelectorAll('[data-clock]').forEach(el=>{el.textContent=Number(el.dataset.clock)===restExercise?(finished?'Descanso finalizado':'Descanso: '+restFormat(restRemaining)):''});
 if(finished){storeRestMeasurement();clearInterval(restTimer);restTimer=null;if(navigator.vibrate)navigator.vibrate([150,100,150]);restPaused=true}
}
function storeRestMeasurement(){
 if(restExercise===null)return;
 if(restActiveSince&&!restPaused)restElapsed+=(Date.now()-restActiveSince)/1000;
 restActiveSince=0;
 const e=E.find(x=>x.id===restExercise);if(!e)return;
 const key=state.week+'_'+e.id;state.logs[key]??={sets:[]};
 // Sólo se registran descansos iniciados explícitamente; máximo 10 minutos por pausa.
 if(restElapsed>=10&&restElapsed<=600){
  const log=state.logs[key];log.restActual??=[];log.restActual.push(Math.round(restElapsed));
  log.restActual=log.restActual.slice(-Math.max(0,e.sets-1));save();
 }
 restElapsed=0;
}
function startRest(e){storeRestMeasurement();restElapsed=0;restActiveSince=Date.now();clearInterval(restTimer);restExercise=e.id;restName=e.name;restRemaining=Math.max(0,restSeconds(e));restPaused=false;restEnd=Date.now()+restRemaining*1000;$('floatingRest').classList.add('visible');document.body.classList.add('has-rest');updateRestClock();if(restRemaining>0)restTimer=setInterval(updateRestClock,300)}
$('exercises').addEventListener('click',ev=>{const b=ev.target.closest('[data-rest]');if(!b)return;const e=E.find(x=>x.id===Number(b.dataset.rest));if(e)startRest(e)});
$('floatRestToggle').addEventListener('click',()=>{if(restExercise===null||restRemaining===0)return;if(restPaused){restPaused=false;restActiveSince=Date.now();restEnd=Date.now()+restRemaining*1000;restTimer=setInterval(updateRestClock,300)}else{restRemaining=Math.max(0,Math.ceil((restEnd-Date.now())/1000));restElapsed+=(Date.now()-restActiveSince)/1000;restActiveSince=0;restPaused=true;clearInterval(restTimer);restTimer=null}updateRestClock()});
$('floatRestPlus').addEventListener('click',()=>{if(restExercise===null)return;restRemaining+=30;if(!restPaused)restEnd=Date.now()+restRemaining*1000;updateRestClock()});
$('floatRestClose').addEventListener('click',()=>{storeRestMeasurement();clearInterval(restTimer);restTimer=null;restExercise=null;restRemaining=0;restPaused=false;restActiveSince=0;restElapsed=0;$('floatingRest').classList.remove('visible');document.body.classList.remove('has-rest');document.querySelectorAll('[data-clock]').forEach(el=>el.textContent='')});
$('initial').addEventListener('change',e=>{const value=parseLocalizedNumber(e.target.value);if(value===null||value<=0){e.target.value=String(state.initial).replace('.',',');return}state.initial=value;e.target.value=String(value).replace('.',',');save();renderMass()});$('rate').addEventListener('change',e=>{state.rate=Number(e.target.value);save();renderMass()});$('mass').addEventListener('change',e=>{if(!e.target.value.trim()){delete state.mass[state.week];save();renderMass();return}const value=parseLocalizedNumber(e.target.value);if(value===null||value<=0){e.target.value=state.mass[state.week]===undefined?'':String(state.mass[state.week]).replace('.',',');return}state.mass[state.week]=value;e.target.value=String(value).replace('.',',');save();renderMass()});
function download(content,name,type){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([content],{type}));a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000)}
$('export').onclick=()=>download(JSON.stringify({app:'entrenamiento-42',version:1,exported:new Date().toISOString(),state},null,2),'entrenamiento-42-respaldo.json','application/json');$('exportCsv').onclick=()=>{const rows=[['Semana','Día','Ejercicio','Serie','Carga','Unidad','Repeticiones','RIR','Dolor','Notas']];for(let w=1;w<=8;w++)for(const e of E){const log=getLog(w,e.id);(log.sets||[]).forEach((s,i)=>rows.push([w,D[e.day],e.name,i+1,s.load??'',e.unit,s.reps??'',s.rir??'',log.pain?'Sí':'No',log.note??'']))}const csv='\ufeff'+rows.map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(';')).join('\r\n');download(csv,'entrenamiento-42-historial.csv','text/csv;charset=utf-8')};$('importBtn').onclick=()=>$('importFile').click();$('importFile').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const data=JSON.parse(await f.text());if(data.app!=='entrenamiento-42'||!data.state||!data.state.logs)throw Error('Formato no válido');if(!confirm('¿Reemplazar los registros actuales por esta copia?'))return;state={...state,...data.state};save();render();alert('Copia importada correctamente')}catch(err){alert('No se pudo importar: '+err.message)}e.target.value=''};render();save();
// Calculadora de calorías: estimaciones por intensidad percibida, no calorimetría.
const CALKEY='entrenamiento-42-cal-v1';
let calState={weight:88,segments:[{activity:'flex',duration:20,level:5,pace:'media',effort:'suave'},{activity:'flex',duration:20,level:6,pace:'media',effort:'suave'},{activity:'flex',duration:20,level:8,pace:'media',effort:'moderado'}]};
try{const old=JSON.parse(localStorage.getItem(CALKEY)||'null');if(old&&Array.isArray(old.segments))calState=old}catch(e){}
function calSave(){try{localStorage.setItem(CALKEY,JSON.stringify(calState))}catch(e){}}
function calMet(x){const effort=x.effort||'suave';if(x.activity==='flex'){let m=effort==='muy-suave'?1.35:effort==='suave'?1.65:effort==='moderado'?2.2:3.1; if(x.pace==='lenta')m-=.15; if(x.pace==='rapida')m+=.2; m+=(Math.min(8,Math.max(1,Number(x.level)||5))-5)*.04;return Math.max(1.2,m)}if(x.activity==='spin')return effort==='muy-suave'?3.5:effort==='suave'?5:effort==='moderado'?7:9;if(x.activity==='strength')return effort==='muy-suave'?2:effort==='suave'?2.8:effort==='moderado'?3.6:5;return effort==='muy-suave'?1.5:effort==='suave'?2.4:effort==='moderado'?3.3:4.3}
function calCompute(){const kg=Number(calState.weight);let gross=0,net=0,mins=0;for(const x of calState.segments){const t=Number(x.duration);if(!Number.isFinite(t)||t<=0)continue;const met=calMet(x);gross+=met*3.5*kg/200*t;net+=(met-1)*3.5*kg/200*t;mins+=t}const valid=kg>=30&&kg<=300&&mins>0;document.getElementById('calGross').textContent=valid?Math.round(gross)+' kcal':'—';document.getElementById('calNet').textContent=valid?Math.round(net)+' kcal':'—';document.getElementById('calPrudent').textContent=valid?Math.round(net*.75)+' kcal':'—';document.getElementById('calInfo').textContent=valid?Math.round(mins)+' min · descuento prudencial del 25 % aplicado al gasto extra; estimación orientativa, no una medición de potencia ni fórmula clínica validada.':'Ingresá un peso y al menos un tramo.'}
function calRender(){document.getElementById('calWeight').value=calState.weight;document.getElementById('calSegments').innerHTML=calState.segments.map((x,i)=>`<div class="card" style="margin:9px 0"><div class="row"><strong>Tramo ${i+1}</strong><button type="button" class="secondary" data-cal-remove="${i}" ${calState.segments.length===1?'disabled':''}>Quitar</button></div><div class="grid"><div><label>Actividad</label><select data-cal-i="${i}" data-cal-k="activity"><option value="flex" ${x.activity==='flex'?'selected':''}>FlexiSpot</option><option value="spin" ${x.activity==='spin'?'selected':''}>Spinning</option><option value="strength" ${x.activity==='strength'?'selected':''}>Fuerza (incluye descansos)</option><option value="walk" ${x.activity==='walk'?'selected':''}>Caminata</option></select></div><div><label>Minutos</label><input data-cal-i="${i}" data-cal-k="duration" type="number" min="0" max="600" value="${x.duration}" inputmode="numeric"></div><div><label>Esfuerzo percibido</label><select data-cal-i="${i}" data-cal-k="effort">${[['muy-suave','Muy suave'],['suave','Suave'],['moderado','Moderado'],['intenso','Intenso']].map(([v,label])=>`<option value="${v}" ${x.effort===v?'selected':''}>${label}</option>`).join('')}</select></div>${x.activity==='flex'?`<div><label>Resistencia FlexiSpot (1–8)</label><select data-cal-i="${i}" data-cal-k="level">${Array.from({length:8},(_,j)=>`<option value="${j+1}" ${Number(x.level)===j+1?'selected':''}>${j+1}</option>`).join('')}</select></div><div><label>Cadencia subjetiva</label><select data-cal-i="${i}" data-cal-k="pace">${[['lenta','Lenta'],['media','Media'],['rapida','Rápida']].map(([v,l])=>`<option value="${v}" ${x.pace===v?'selected':''}>${l}</option>`).join('')}</select></div>`:''}</div></div>`).join('');calCompute()}
document.getElementById('calWeight').addEventListener('input',e=>{calState.weight=e.target.value;calSave();calCompute()});
document.getElementById('addCalSegment').addEventListener('click',()=>{if(calState.segments.length>=12)return;calState.segments.push({activity:'flex',duration:15,level:5,pace:'media',effort:'suave'});calSave();calRender()});
document.getElementById('calSegments').addEventListener('change',e=>{const el=e.target,i=Number(el.dataset.calI),k=el.dataset.calK;if(!Number.isInteger(i)||!k||!calState.segments[i])return;calState.segments[i][k]=el.value;calSave();calRender()});
document.getElementById('calSegments').addEventListener('click',e=>{const b=e.target.closest('[data-cal-remove]');if(!b)return;calState.segments.splice(Number(b.dataset.calRemove),1);calSave();calRender()});
calRender();

// Estimador por ejercicio: excedente sobre reposo, sin afirmar exactitud por serie.
const STRENGTH_KEY='entrenamiento-42-strength-cal-v1';
let strengthPrefs={weight:88,minutes:'',effort:'medium'};try{strengthPrefs={...strengthPrefs,...JSON.parse(localStorage.getItem(STRENGTH_KEY)||'{}')}}catch(e){}
function strengthNum(x){const v=Number(x);return x==null||x===''||!Number.isFinite(v)?null:v}
function strengthEstimate(){
 const kg=Number(strengthPrefs.weight),w=state.week,d=state.day;
 if(!(kg>=30&&kg<=300)){ $('strengthInfo').textContent='Ingresá un peso válido.';return null }
 let gross=0,net=0,minutes=0,completed=0,rows=[];
 for(const e of E.filter(x=>x.day===d && !['cardio'].includes(x.type))){
  const log=getLog(w,e.id),sets=(log.sets||[]).filter(x=>strengthNum(x.reps)!==null&&Number(x.reps)>0&&strengthNum(x.load)!==null && (['core','posture','rehab'].includes(e.type)||strengthNum(x.rir)!==null));
  if(!sets.length)continue;
  let workMin=0,workNet=0,workGross=0;
  for(const x of sets){
    const reps=Math.min(60,Math.max(1,Number(x.reps)));
    const effectiveReps=e.type==='core'&&e.unit==='segundos'?Math.min(reps,60)/3:reps;
    const m=Math.max(.2,Math.min(3,effectiveReps*3/60));
    let met=e.type==='compound'?4.6:e.type==='isolation'?3.7:e.type==='rehab'?2.5:2.8;
    const rir=strengthNum(x.rir);if(rir!==null)met+=Math.max(-.4,Math.min(.4,(3-rir)*.12));
    met=Math.max(2,Math.min(5.2,met));
    workMin+=m;workGross+=met*3.5*kg/200*m;workNet+=(met-1)*3.5*kg/200*m;
  }
  // Count rest only between completed sets, not after last set.
  const planned=restSeconds(e)/60;const measurements=(log.restActual||[]).slice(0,Math.max(0,sets.length-1));const restMin=measurements.reduce((a,v)=>a+Math.min(600,Math.max(0,Number(v)||0))/60,0)+Math.max(0,sets.length-1-measurements.length)*planned;
  const restGross=1.2*3.5*kg/200*restMin,restNet=.2*3.5*kg/200*restMin;
  const totalMin=workMin+restMin,totalGross=workGross+restGross,totalNet=workNet+restNet;
  gross+=totalGross;net+=totalNet;minutes+=totalMin;completed+=sets.length;
  rows.push({name:e.name,sets:sets.length,totalMin,net:totalNet,measured:measurements.length});
 }
 const actual=strengthNum(strengthPrefs.minutes);let extraNote='';
 if(actual!==null&&actual>minutes){const uncounted=actual-minutes;const met=({low:1.4,medium:2.0,high:2.4})[strengthPrefs.effort]||2.0;gross+=uncounted*met*3.5*kg/200;net+=uncounted*(met-1)*3.5*kg/200;minutes=actual;extraNote=' '+Math.round(uncounted)+' min no desglosados estimados a '+met.toLocaleString('es-UY')+' MET según el movimiento indicado.'}
 else if(actual!==null&&actual<minutes)extraNote=' El tiempo indicado es inferior al calculado con los descansos; se usó el calculado.';
 $('strengthGross').textContent=completed?Math.round(gross)+' kcal':'—';
 $('strengthNet').textContent=completed?Math.round(net)+' kcal':'—';
 $('strengthPrudent').textContent=completed?Math.round(net*.75)+' kcal':'—';
 $('strengthRange').textContent=completed?'Rango orientativo de gasto extra: '+Math.round(net*.7)+'–'+Math.round(net*1.3)+' kcal. Es un margen de sensibilidad ilustrativo, no un intervalo estadístico validado.':'';
 $('strengthInfo').textContent=completed?`${completed} series registradas · ${Math.round(minutes)} min estimados.${extraNote} Incluye sólo el trabajo registrado, no spinning ni FlexiSpot.`:'Todavía no hay series completas registradas en este día. Ingresá carga, repeticiones y RIR de cada serie.';
 $('strengthBreakdown').innerHTML=rows.length?'<table><thead><tr><th>Ejercicio</th><th>Series</th><th>Extra aprox.</th><th>Descansos reales</th></tr></thead><tbody>'+rows.map(x=>'<tr><td>'+esc(x.name)+'</td><td>'+x.sets+'</td><td>'+Math.round(x.net)+' kcal</td><td>'+x.measured+'</td></tr>').join('')+'</tbody></table>':'<p class="muted">Sin registros.</p>';
 return completed?{gross,net,minutes,completed}:null;
}
$('strengthWeight').value=strengthPrefs.weight;$('strengthMinutes').value=strengthPrefs.minutes;$('strengthEffort').value=['low','medium','high'].includes(strengthPrefs.effort)?strengthPrefs.effort:'medium';
$('strengthEffort').addEventListener('change',e=>{strengthPrefs.effort=e.target.value;try{localStorage.setItem(STRENGTH_KEY,JSON.stringify(strengthPrefs))}catch(err){}strengthEstimate()});
['strengthWeight','strengthMinutes'].forEach(id=>$(id).addEventListener('input',e=>{strengthPrefs[id==='strengthWeight'?'weight':'minutes']=e.target.value;try{localStorage.setItem(STRENGTH_KEY,JSON.stringify(strengthPrefs))}catch(err){}strengthEstimate()}));
$('exercises').addEventListener('input',e=>{if(e.target.dataset.log)strengthEstimate()});
$('exercises').addEventListener('change',e=>{if(e.target.dataset.log||e.target.dataset.setting)strengthEstimate()});
$('day').addEventListener('change',strengthEstimate);$('weeks').addEventListener('click',()=>setTimeout(strengthEstimate,0));
strengthEstimate();
// Diario local por fecha; no se mezclan tramos que no hayan sido guardados explícitamente.
const DAILY_KEY='entrenamiento-42-daily-v1';
let daily={profile:{weight:88,age:43,height:168,sex:'male',factor:1.2},days:{}};
try{const saved=JSON.parse(localStorage.getItem(DAILY_KEY)||'null');if(saved&&saved.days)daily={profile:{...daily.profile,...(saved.profile||{})},days:saved.days}}catch(e){}
const todayLocal=()=>{const d=new Date(),z=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())};
$('dailyDate').value=todayLocal();
function dailySave(){try{localStorage.setItem(DAILY_KEY,JSON.stringify(daily))}catch(e){alert('No se pudo guardar el diario. Exportá una copia JSON.')}}
function dailyDate(){return $('dailyDate').value||todayLocal()}
function dayEntries(){return daily.days[dailyDate()]||[]}
function validProfile(){const p=daily.profile;return p.weight>=30&&p.weight<=300&&p.age>=18&&p.age<=100&&p.height>=120&&p.height<=230}
function dailyRender(){
 const p=daily.profile,entries=dayEntries();
 if(!validProfile()){$('dailyExplanation').textContent='Revisá peso, edad y estatura.';return}
 const bmr=10*p.weight+6.25*p.height-5*p.age+(p.sex==='male'?5:-161);
 const net=entries.reduce((sum,x)=>sum+(Number(x.net)||0),0),gross=entries.reduce((sum,x)=>sum+(Number(x.gross)||0),0);
 // Diet/activity factor baseline includes background activity. Net exercise increment is added only once.
 const base=bmr*p.factor,total=base+net;
 $('dailyBmr').textContent=Math.round(bmr)+' kcal';$('dailyExtra').textContent=Math.round(net)+' kcal';$('dailyPrudent').textContent=Math.round(net*.75)+' kcal';$('dailyTotal').textContent=Math.round(total)+' kcal';
 $('dailyEntries').innerHTML=entries.length?'<table><thead><tr><th>Actividad</th><th>Duración</th><th>Extra</th><th></th></tr></thead><tbody>'+entries.map((x,i)=>'<tr><td>'+esc(x.label)+'</td><td>'+Math.round(x.minutes||0)+' min</td><td>'+Math.round(x.net||0)+' kcal</td><td><button class="secondary" data-del-daily="'+i+'" type="button" aria-label="Eliminar registro">Quitar</button></td></tr>').join('')+'</tbody></table>':'<p class="muted">Aún no hay actividades guardadas para esta fecha.</p>';
 $('dailyExplanation').textContent='Base diaria '+Math.round(base)+' kcal ('+Math.round(bmr)+' basal × '+p.factor+') + '+Math.round(net)+' kcal extra = '+Math.round(total)+' kcal. Actividades: '+Math.round(gross)+' kcal brutas. El extra prudente es sólo una referencia alternativa para MyFitnessPal; no se suma otra vez. Evitá registrar dos veces pesas o actividad habitual.';
}
for(const k of ['weight','age','height','sex','factor']){$('daily'+k[0].toUpperCase()+k.slice(1)).value=daily.profile[k];$('daily'+k[0].toUpperCase()+k.slice(1)).addEventListener('change',e=>{daily.profile[k]=['sex'].includes(k)?e.target.value:Number(e.target.value);dailySave();dailyRender()})}
$('dailyDate').addEventListener('change',dailyRender);
$('dailySaveStrength').addEventListener('click',()=>{
 const result=strengthEstimate();if(!result){alert('Completá por lo menos una serie de fuerza (carga, repeticiones y RIR, cuando corresponda) antes de guardar.');return}
 const key=dailyDate(),entries=daily.days[key]||[];const entry={kind:'strength',label:'Fuerza · '+D[state.day]+' · semana '+state.week,minutes:result.minutes,net:result.net,gross:result.gross};const i=entries.findIndex(x=>x.kind==='strength');if(i>=0)entries[i]=entry;else entries.push(entry);daily.days[key]=entries;dailySave();dailyRender();
});
function saveCalculatorToDay(){
 const weight=Number(calState.weight);
 if(!(weight>=30&&weight<=300)){alert('Revisá el peso corporal de la calculadora.');return false}
 const items=calState.segments.filter(segment=>Number(segment.duration)>0).map(segment=>{
  const minutes=Number(segment.duration),met=calMet(segment);
  return {kind:'manual',source:'calculator',label:({flex:'FlexiSpot',spin:'Spinning',strength:'Fuerza manual',walk:'Caminata'}[segment.activity]||segment.activity),minutes,
   net:(met-1)*3.5*weight/200*minutes,gross:met*3.5*weight/200*minutes}
 });
 if(!items.length){alert('Agregá por lo menos una actividad con duración válida.');return false}
 const date=dailyDate(),existing=daily.days[date]||[];
 if(items.some(item=>item.label==='Fuerza manual')&&existing.some(item=>item.kind==='strength')){
  if(!confirm('Ya hay una sesión de fuerza registrada. ¿La fuerza manual corresponde a otra sesión distinta?'))return false
 }
 // Calculator entries are one editable group per day; repeated saves replace this group.
 const preserved=existing.filter(item=>item.source!=='calculator');
 daily.days[date]=[...preserved,...items];
 dailySave();dailyRender();
 $('calSaveStatus').textContent='Guardadas '+items.length+' actividad(es) para '+date+'. Extra total del día: '+$('dailyExtra').textContent+'.';
 return true
}
$('dailyAddFromCalc').addEventListener('click',()=>{if(saveCalculatorToDay())$('dailyCalories').scrollIntoView({behavior:'smooth',block:'start'})});
$('saveCalculatedActivities').addEventListener('click',()=>{if(saveCalculatorToDay())$('dailyCalories').scrollIntoView({behavior:'smooth',block:'start'})});
$('dailyEntries').addEventListener('click',e=>{const b=e.target.closest('[data-del-daily]');if(!b)return;daily.days[dailyDate()].splice(Number(b.dataset.delDaily),1);dailySave();dailyRender()});
// Export/import copies include the calendar, while retaining previous app format for compatibility.
$('export').onclick=()=>download(JSON.stringify({app:'entrenamiento-42',version:2,exported:new Date().toISOString(),state,daily,calState,strengthPrefs},null,2),'entrenamiento-42-respaldo.json','application/json');
$('importFile').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const data=JSON.parse(await f.text());if(data.app!=='entrenamiento-42'||!data.state||!data.state.logs)throw Error('Formato no válido');if(!confirm('¿Reemplazar los registros actuales por esta copia?'))return;state={...state,...data.state};if(data.daily&&data.daily.days)daily={profile:{...daily.profile,...data.daily.profile},days:data.daily.days};if(data.calState&&Array.isArray(data.calState.segments))calState=data.calState;if(data.strengthPrefs)strengthPrefs={...strengthPrefs,...data.strengthPrefs};save();dailySave();calSave();try{localStorage.setItem(STRENGTH_KEY,JSON.stringify(strengthPrefs))}catch(err){}render();calRender();strengthEstimate();dailyRender();alert('Copia importada correctamente')}catch(err){alert('No se pudo importar: '+err.message)}e.target.value=''};
dailyRender();
