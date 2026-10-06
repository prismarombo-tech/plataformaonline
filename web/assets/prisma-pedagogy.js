// Curriculum metadata: authored dimensions first; unit defaults stay explicitly provisional.
(()=>{'use strict';const bank=window.PRISMA_BANK_DATA;if(!bank?.units)return;
 const module=bank.moduleKey||new URLSearchParams(location.search).get('module');
 for(const [index,unit] of bank.units.entries())for(const q of unit.questions||[]){
  const explicit=q.competency?.dimensions?.length>0;
  const dimensions=explicit?q.competency.dimensions:window.PRISMA_ADAPTIVE.inferDimensions(module,{competency:{},prompt:'',skill:''});
  q.pedagogy={content:unit.title,prerequisite:index?bank.units[index-1].id:null,difficulty:q.learningRole==='transfer'||q.learningRole==='final'?3:q.learningRole==='application'?2:1,dimensions,source:explicit?'existing-authored-dimensions':'module-default',validation:'expert-review-pending',evidenceKind:q.reserve?'practice-variant':'practice',sourceItem:q.reserveSourceId||q.sourceItemId||q.id};
  q.competency={...q.competency,dimensions};
 }
})();
