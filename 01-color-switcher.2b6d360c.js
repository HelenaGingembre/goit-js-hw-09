!function(){var e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body"),n=null,o=function(){n=setInterval((function(){d.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),a()},r=function(){console.log("clearInterval"),clearInterval(n),a()};function a(){e.disabled?(e.removeAttribute("disabled"),t.setAttribute("disabled","disabled")):(t.removeAttribute("disabled"),e.setAttribute("disabled","disabled"))}e.addEventListener("click",o),t.addEventListener("click",r)}();
//# sourceMappingURL=01-color-switcher.2b6d360c.js.map
