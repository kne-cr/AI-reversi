var Setting,Board,AI;String.prototype.to_i=function(){return parseInt(this,10)},String.prototype.row_col=function(){var t,o,n,e,r;for(r=[],o=0,n=(e=this.split("")).length;o<n;o++)t=e[o],r.push(t.to_i());return r},Setting=function(){function t(){}return t.DISK={BLACK:"black",WHITE:"white",NONE:""},t.AI={SCORE:{A:0,B:0,C:-5,X:-10,CORNER:30,NONE:0}},t.BOARD={INITIAL:[["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","",t.DISK.WHITE,t.DISK.BLACK,"","",""],["","","",t.DISK.BLACK,t.DISK.WHITE,"","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""]],SCORE:[[t.AI.SCORE.CORNER,t.AI.SCORE.C,t.AI.SCORE.A,t.AI.SCORE.B,t.AI.SCORE.B,t.AI.SCORE.A,t.AI.SCORE.C,t.AI.SCORE.CORNER],[t.AI.SCORE.C,t.AI.SCORE.X,0,0,0,0,t.AI.SCORE.X,t.AI.SCORE.C],[t.AI.SCORE.A,0,0,0,0,0,0,t.AI.SCORE.A],[t.AI.SCORE.B,0,0,0,0,0,0,t.AI.SCORE.B],[t.AI.SCORE.B,0,0,0,0,0,0,t.AI.SCORE.B],[t.AI.SCORE.A,0,0,0,0,0,0,t.AI.SCORE.A],[t.AI.SCORE.C,t.AI.SCORE.X,0,0,0,0,t.AI.SCORE.X,t.AI.SCORE.C],[t.AI.SCORE.CORNER,t.AI.SCORE.C,t.AI.SCORE.A,t.AI.SCORE.B,t.AI.SCORE.B,t.AI.SCORE.A,t.AI.SCORE.C,t.AI.SCORE.CORNER]]},t}(),Board=function(){function t(){this.cells=Setting.BOARD.INITIAL,this.this_player=Setting.DISK.BLACK,this.next_player=Setting.DISK.WHITE,this.blank_cells=60,this.AI="-",this.you="-"}return t.ADJACENT=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],t.prototype.clone=function(){return jQuery.extend(!0,{},this)},t.prototype.change=function(){var t;return t=[this.next_player,this.this_player],this.this_player=t[0],this.next_player=t[1],t},t.prototype.count_you=function(){var t,o,n,e,r,i,a,s,_;for(o=0,_=n=0,r=(a=this.cells).length;n<r;_=++n)for(t=e=0,i=(s=a[_]).length;e<i;t=++e)s[t]===this.you&&(o+=1);return o},t.prototype.count_AI=function(){var t,o,n,e,r,i,a,s,_;for(o=0,_=n=0,r=(a=this.cells).length;n<r;_=++n)for(t=e=0,i=(s=a[_]).length;e<i;t=++e)s[t]===this.AI&&(o+=1);return o},t.prototype.draw=function(){return this.draw_board(),$(".mini_disk.you").text(this.count_you()),$(".mini_disk.AI").text(this.count_AI())},t.prototype.draw_board=function(){var t,o,n,e,r,i,a,s,_;for(i=this.cells,a=[],_=e=0,r=i.length;e<r;_=++e)s=i[_],a.push(function(){var e,r,i;for(i=[],n=e=0,r=s.length;e<r;n=++e)o=s[n],t=$("#"+_+n),this.can_move(_,n)?t.addClass("movable"):t.removeClass("movable"),o!==Setting.DISK.NONE?(t.addClass("disk"),t.removeClass(Setting.DISK.BLACK),t.removeClass(Setting.DISK.WHITE),i.push(t.addClass(o))):i.push(void 0);return i}.call(this));return a},t.prototype.draw_result=function(){return $(".mini_disk.AI").text().to_i()<$(".mini_disk.you").text().to_i()?$(".your_result").text("YOU WIN!!!"):$(".mini_disk.you").text().to_i()<$(".mini_disk.AI").text().to_i()?$(".your_result").text("YOU LOSE..."):$(".your_result").text("DRAW"),$(".choose_disk").hide(),$(".modal").fadeIn(),$(".result").fadeIn()},t.prototype.movable_cells=function(){var t,o,n,e,r,i,a,s,_;for(i=[],_=o=0,e=(a=this.cells).length;o<e;_=++o)for(t=n=0,r=(s=a[_]).length;n<r;t=++n)s[t],this.can_move(_,t)&&i.push([_,t]);return i},t.prototype.movable_cells_length=function(){return this.movable_cells().length},t.prototype.can_move_anywhere=function(){var t,o,n,e,r,i,a,s;for(s=o=0,e=(i=this.cells).length;o<e;s=++o)for(t=n=0,r=(a=i[s]).length;n<r;t=++n)if(a[t],this.can_move(s,t))return!0;return!1},t.prototype.move=function(t,o){return this.blank_cells-=1,this.flip(t,o),this.change()},t.prototype.can_move=function(o,n){var e,r,i,a,s,_;if(this.cells[o][n]!==Setting.DISK.NONE)return!1;for(e=0,r=(i=t.ADJACENT).length;e<r;e++)if(_=(a=i[e])[0],s=a[1],0<this.flip_disk_each_direction(o,n,_,s).length)return!0;return!1},t.prototype.flip=function(o,n){var e,r,i,a,s,_,l,c,u;for(this.cells[o][n]=this.this_player,l=[],i=0,a=(s=t.ADJACENT).length;i<a;i++)_=s[i],u=_[0],c=_[1],l.push(function(){var t,i,a,s,_;for(_=[],t=0,i=(a=this.flip_disk_each_direction(o,n,u,c)).length;t<i;t++)s=a[t],r=s[0],e=s[1],_.push(this.cells[r][e]=this.this_player);return _}.call(this));return l},t.prototype.flip_disk=function(o,n){var e,r,i,a,s,_,l;for(e=[],r=0,i=(a=t.ADJACENT).length;r<i;r++)l=(s=a[r])[0],_=s[1],e=e.concat(this.flip_disk_each_direction(o,n,l,_));return e},t.prototype.flip_disk_each_direction=function(t,o,n,e){var r,i,a,s,_;for(s=[],a=t,i=o,_=0;_<=8;_++){if(i+=e,!(0<=(a+=n)&&a<=7&&0<=i&&i<=7))return[];if((r=this.cells[a][i])!==this.next_player)return r===this.this_player?s:[];s.push([a,i])}},t}(),AI=function(){function t(t){this.board=t}return t.prototype.search=function(){},t}();var AI1,extend=function(t,o){for(var n in o)hasProp.call(o,n)&&(t[n]=o[n]);function e(){this.constructor=t}return e.prototype=o.prototype,t.prototype=new e,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;AI1=function(t){function o(){return o.__super__.constructor.apply(this,arguments)}return extend(o,AI),o.prototype.search=function(){var t,o,n,e,r,i,a,s,_,l,c;for(o in _=(e=[-1,-1])[0],s=e[1],n=-64,r=this.board.movable_cells())l=(i=r[o])[0],t=i[1],n<(c=this.board.flip_disk(l,t).length)&&(n=c,_=(a=[l,t])[0],s=a[1]);return[_,s]},o}();var AI2;extend=function(t,o){for(var n in o)hasProp.call(o,n)&&(t[n]=o[n]);function e(){this.constructor=t}return e.prototype=o.prototype,t.prototype=new e,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;AI2=function(t){function o(){return o.__super__.constructor.apply(this,arguments)}return extend(o,AI),o.prototype.search=function(){var t,o,n,e,r,i,a,s,_,l,c;for(o in _=(e=[-1,-1])[0],s=e[1],n=64,r=this.board.movable_cells())l=(i=r[o])[0],t=i[1],(c=this.board.flip_disk(l,t).length)<n&&(n=c,_=(a=[l,t])[0],s=a[1]);return[_,s]},o}();var AI3;extend=function(t,o){for(var n in o)hasProp.call(o,n)&&(t[n]=o[n]);function e(){this.constructor=t}return e.prototype=o.prototype,t.prototype=new e,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;AI3=function(t){function o(){return o.__super__.constructor.apply(this,arguments)}return extend(o,AI),o.prototype.search=function(){var t,o,n,e,r,i,a,s,_,l,c,u;for(o in l=(r=[-1,-1])[0],_=r[1],n=-64,i=this.board.movable_cells())c=(a=i[o])[0],t=a[1],(e=this.board.clone()).move(c,t),n<(u=this.more_move_count(e))&&(n=u,l=(s=[c,t])[0],_=s[1]);return[l,_]},o.prototype.more_move_count=function(t){var o;return o=t.movable_cells_length(),t.change(),t.movable_cells_length()-o},o}();var AI4;extend=function(t,o){for(var n in o)hasProp.call(o,n)&&(t[n]=o[n]);function e(){this.constructor=t}return e.prototype=o.prototype,t.prototype=new e,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;AI4=function(t){function o(){return o.__super__.constructor.apply(this,arguments)}return extend(o,AI3),o.prototype.search=function(){var t,o,n,e,r,i,a,s,_,l,c,u;for(o in l=(r=[-1,-1])[0],_=r[1],n=-64,i=this.board.movable_cells())c=(a=i[o])[0],t=a[1],(e=this.board.clone()).move(c,t),n<(u=this.min_score(e))&&(n=u,l=(s=[c,t])[0],_=s[1]);return[l,_]},o.prototype.min_score=function(t){var o,n,e,r,i,a,s,_;for(n in s=64,r=t.movable_cells())a=(i=r[n])[0],o=i[1],(e=t.clone()).move(a,o),(_=this.more_move_count(e))<s&&(s=_);return s},o}();var AI5;extend=function(t,o){for(var n in o)hasProp.call(o,n)&&(t[n]=o[n]);function e(){this.constructor=t}return e.prototype=o.prototype,t.prototype=new e,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;AI5=function(t){function o(t){this.board=t,this.not_final_depth_limit=1}return extend(o,AI),o.prototype.search=function(){return this.search_not_final()},o.prototype.search_not_final=function(){var t,o,n,e,r,i,a,s,_,l,c,u;for(o in n=(r=[-64,-1,-1])[0],l=r[1],_=r[2],i=this.board.movable_cells())c=(a=i[o])[0],t=a[1],(e=this.board.clone()).move(c,t),u=this.search_not_final_best_of_you(e,0,n),n<(u+=Setting.BOARD.SCORE[c][t])&&(n=(s=[u,c,t])[0],l=s[1],_=s[2]);return[l,_]},o.prototype.search_not_final_best_of_AI=function(t,o,n){var e,r,i,a,s,_,l,c;if(this.not_final_depth_limit<=o)return this.evaluate_not_final(t);if(i=-64,0===(a=t.movable_cells()).length)return t.change(),t.can_move_anywhere()?this.search_not_final_best_of_you(t,o+1,i):this.evaluate_not_final(t);for(r in a){if(l=(_=a[r])[0],e=_[1],(s=t.clone()).move(l,e),c=this.search_not_final_best_of_you(s,o+1,i),n<(c+=Setting.BOARD.SCORE[l][e]))return c;i<c&&(i=c)}return i},o.prototype.search_not_final_best_of_you=function(t,o,n){var e,r,i,a,s,_,l,c;if(this.not_final_depth_limit<=o)return t.change(),this.evaluate_not_final(t);if(i=64,0===(a=t.movable_cells()).length)return t.change(),t.can_move_anywhere()?this.search_not_final_best_of_AI(t,o+1,i):64;for(r in a){if(l=(_=a[r])[0],e=_[1],(s=t.clone()).move(l,e),c=this.search_not_final_best_of_AI(s,o+1,i),(c-=Setting.BOARD.SCORE[l][e])<n)return c;c<i&&(i=c)}return i},o.prototype.evaluate_not_final=function(t){var o;return o=t.movable_cells_length(),t.change(),o-t.movable_cells_length()},o}();var AI6;extend=function(t,o){for(var n in o)hasProp.call(o,n)&&(t[n]=o[n]);function e(){this.constructor=t}return e.prototype=o.prototype,t.prototype=new e,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;AI6=function(t){function o(t){this.board=t,this.not_final_depth_limit=1,this.final_depth_limit=1}return extend(o,AI5),o.prototype.search=function(){return 16<this.board.blank_cells?this.search_not_final():this.search_final()},o.prototype.search_final=function(){var t,o,n,e,r,i,a,s,_,l,c,u;for(o in n=(r=[-64,-1,-1])[0],l=r[1],_=r[2],i=this.board.movable_cells())c=(a=i[o])[0],t=a[1],(e=this.board.clone()).move(c,t),n<(u=this.search_final_best_of_you(e,0,n))&&(n=(s=[u,c,t])[0],l=s[1],_=s[2]);return[l,_]},o.prototype.search_final_best_of_AI=function(t,o,n){var e,r,i,a,s,_,l,c;if(this.final_depth_limit<=o)return this.evaluate_final(t);if(i=-64,0===(a=t.movable_cells()).length)return t.change(),t.can_move_anywhere()?this.search_final_best_of_you(t,o+1,i):this.evaluate_final(t);for(r in a){if(l=(_=a[r])[0],e=_[1],(s=t.clone()).move(l,e),(c=this.search_final_best_of_you(s,o+1,i))<n)return c;i<c&&(i=c)}return i},o.prototype.search_final_best_of_you=function(t,o,n){var e,r,i,a,s,_,l,c;if(this.final_depth_limit<=o)return this.evaluate_final(t);if(i=64,0===(a=t.movable_cells()).length)return t.change(),t.can_move_anywhere()?this.search_final_best_of_AI(t,o+1,i):this.evaluate_final(t);for(r in a){if(l=(_=a[r])[0],e=_[1],(s=t.clone()).move(l,e),n<(c=this.search_final_best_of_AI(s,o+1,i)))return c;c<i&&(i=c)}return i},o.prototype.evaluate_final=function(t){var o,n,e,r,i,a,s,_,l,c;for(e=0,c=r=0,a=(_=t.cells).length;r<a;c=++r)for(n=i=0,s=(l=_[c]).length;i<s;n=++i)(o=l[n])===t.AI?e+=1:o===t.you&&(e-=1);return e},o}();var AI7;extend=function(t,o){for(var n in o)hasProp.call(o,n)&&(t[n]=o[n]);function e(){this.constructor=t}return e.prototype=o.prototype,t.prototype=new e,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;AI7=function(t){function o(t){this.board=t,this.not_final_depth_limit=3,this.final_depth_limit=7}return extend(o,AI6),o}();var AI8;extend=function(t,o){for(var n in o)hasProp.call(o,n)&&(t[n]=o[n]);function e(){this.constructor=t}return e.prototype=o.prototype,t.prototype=new e,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;AI8=function(t){function o(){return o.__super__.constructor.apply(this,arguments)}return extend(o,AI7),o.prototype.evaluate_not_final=function(t){var o;return o=t.movable_cells_length(),t.change(),o-2*t.movable_cells_length()-t.count_AI()/2},o}(),window.onload=function(){var t;return window.board=new Board,window.board.draw(),$(".big_disk.black").on("click",function(){return window.board.you=Setting.DISK.BLACK,window.board.AI=Setting.DISK.WHITE,$(".mini_disk.you").addClass("black"),$(".mini_disk.AI").addClass("white"),$(".modal").fadeOut(),window.board.draw()}),$(".big_disk.white").on("click",function(){return window.board.you=Setting.DISK.WHITE,window.board.AI=Setting.DISK.BLACK,$(".mini_disk.you").addClass("white"),$(".mini_disk.AI").addClass("black"),$(".modal").fadeOut(),t(),window.board.draw()}),$(".cell").on("click",function(){var o,n,e;if(e=(n=$(this).attr("id").row_col())[0],o=n[1],window.board.can_move(e,o))return window.board.move(e,o),window.board.can_move_anywhere()?t():window.board.change(),window.board.draw(),window.board.can_move_anywhere()?void 0:window.board.draw_result()}),t=function(){var o,n,e;if(e=(n=new AI8(window.board).search())[0],o=n[1],window.board.move(e,o),!window.board.can_move_anywhere()&&(window.board.change(),window.board.can_move_anywhere()))return t()},$(".result").on("click",".retry",function(){return location.reload()})};