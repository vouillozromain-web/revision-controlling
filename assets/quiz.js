(function(){
  var Q = window.QUIZ;
  if(!Q || !Q.questions){ return; }
  var total = Q.questions.length, score = 0, answered = 0;
  document.title = Q.title ? (Q.title + " — Révision Controlling") : "Quiz";

  var app = document.getElementById("app");
  var head = document.createElement("header");
  head.className = "top";
  head.innerHTML = '<div><h1>'+esc(Q.title||"Quiz")+'</h1>'+
    (Q.subtitle?'<p class="sub">'+esc(Q.subtitle)+'</p>':'')+'</div>'+
    '<div class="scorebar">Score : <b id="sc">0</b> / '+total+'</div>';
  app.appendChild(head);

  Q.questions.forEach(function(item,i){
    var card = document.createElement("div");
    card.className = "card";
    var q = document.createElement("div");
    q.className = "q";
    q.innerHTML = '<span class="qno">Q'+(i+1)+'</span><br>'+esc(item.q);
    card.appendChild(q);

    var fb = document.createElement("div");
    fb.className = "fb";

    function reveal(good, extra){
      if(card.dataset.done) return;
      card.dataset.done = "1";
      answered++; if(good) score++;
      document.getElementById("sc").textContent = score;
      fb.className = "fb " + (good?"good":"bad");
      fb.style.display = "block";
      fb.innerHTML = '<b>'+(good?"Correct.":"À revoir.")+'</b> '+(extra||"")+esc(item.explain||"");
      if(answered===total) finish();
    }

    if(item.type === "num"){
      var row = document.createElement("div");
      row.className = "numrow";
      var inp = document.createElement("input");
      inp.type = "text"; inp.inputMode = "numeric";
      inp.placeholder = item.placeholder || "Ta réponse";
      var btn = document.createElement("button");
      btn.textContent = "Vérifier";
      function check(){
        if(card.dataset.done) return;
        var val = parseFloat(String(inp.value).replace(/[^0-9.\-]/g,""));
        var good = Math.round(val) === Math.round(item.answer);
        inp.disabled = true; btn.disabled = true;
        inp.className = good ? "good" : "bad";
        reveal(good, good?"":("Réponse : "+fmt(item.answer)+". "));
      }
      btn.onclick = check;
      inp.addEventListener("keydown", function(e){ if(e.key==="Enter") check(); });
      row.appendChild(inp); row.appendChild(btn); card.appendChild(row);
    } else {
      var opts = document.createElement("div");
      opts.className = "opts";
      item.options.forEach(function(opt){
        var b = document.createElement("button");
        b.className = "opt"; b.textContent = opt.t;
        b.onclick = function(){
          if(card.dataset.done) return;
          Array.prototype.forEach.call(opts.children, function(x){ x.disabled = true; });
          b.className = "opt " + (opt.ok ? "good" : "bad");
          if(!opt.ok){
            for(var k=0;k<item.options.length;k++){
              if(item.options[k].ok){ opts.children[k].className = "opt good"; break; }
            }
          }
          reveal(!!opt.ok);
        };
        opts.appendChild(b);
      });
      card.appendChild(opts);
    }
    card.appendChild(fb);
    app.appendChild(card);
  });

  function finish(){
    var d = document.createElement("div");
    d.className = "done";
    var pct = Math.round(score/total*100);
    var msg = pct>=80 ? "Excellent, tu maîtrises ce thème." : pct>=50 ? "Bien, à consolider." : "À retravailler, relis la fiche correspondante.";
    d.innerHTML = '<div>Résultat</div><div class="big">'+score+' / '+total+' ('+pct+'%)</div><div class="sub">'+msg+'</div>';
    app.appendChild(d);
    d.scrollIntoView({behavior:"smooth", block:"center"});
  }

  function esc(s){ return String(s).replace(/[&<>]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]; }); }
  function fmt(n){ try{ return n.toLocaleString("fr-CH"); }catch(e){ return ""+n; } }
})();
