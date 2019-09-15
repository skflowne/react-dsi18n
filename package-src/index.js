"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),React__default=_interopDefault(React);function _slicedToArray(e,n){return _arrayWithHoles(e)||_iterableToArrayLimit(e,n)||_nonIterableRest()}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _iterableToArrayLimit(e,n){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var t=[],a=!0,r=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(a=(l=i.next()).done)&&(t.push(l.value),!n||t.length!==n);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return t}}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var Dsi18nContext=React.createContext(),Dsi18nProvider=function(e){var n=e.locale,t=e.fallback,a=e.translations,r=e.children,o=_slicedToArray(React.useState(n),2),l=o[0],i=o[1];return console.log("Dsi18n initialized with translations",Object.keys(a).join(",")),React__default.createElement(Dsi18nContext.Provider,{value:{currentLocale:l,setCurrentLocale:i,fallback:t,translations:a}},r)};Dsi18nProvider.defaultProps={locale:"en",fallback:"en",translations:{}};var getTranslation=function(e,n){return e.split(".").reduce((function(e,n){return e[n]}),n)},translate=function(e){return function(n,t,a){return function(r){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};void 0===o.newLine&&(o.newLine=React__default.createElement("br",null));var l=n?"".concat(n,".").concat(r):r;try{var i=getTranslation(r,a);if(!i){if(a=getTranslationsForLocale(e.fallback,e.translations),!(i=getTranslation(l,a)))throw new Error("Missing translation");console.warn("Missing translation for key",l,"falling back to",e.fallback)}if(o&&o.locals&&(i=Object.keys(o.locals).reduce((function(e,n){var t=new RegExp("{{".concat(n,"}}"),"gm");return e=e.replace(t,o.locals[n])}),i)),o&&o.newLine){var s=i.split("\n");i=React__default.createElement(React.Fragment,null,s.map((function(e){return React__default.createElement(React.Fragment,{key:e},e,o.newLine)})))}return i}catch(e){return console.error("Dsi18n: missing translation for key",l,"with locale",t),e.message.includes("Missing translation")||e.message.includes("property")||console.error("Previous error was caused by",e),l}}}},useTranslation=function(e){var n=React.useContext(Dsi18nContext),t=n.currentLocale,a=n.fallback,r=getTranslationsForLocale(t,n.translations,a),o=t;return e&&r[e]?r=r[e]:e&&((r=getTranslationsForLocale(a,n.translations))[e]?(console.warn("Dsi18n: missing namespace",e,"for locale",t,"falling back to locale",a),o=a,r=r[e]):(console.error("Dsi18n: missing namespace in both locale",t,"and fallback locale",a),r={})),{t:translate(n)(e,o,r),i18nContext:n}},getTranslationsForLocale=function(e,n,t){var a=e.split("-")[0];return n[e]?n[e]:a&&n[a]?(console.warn("Dsi18n: missing translations for locale",e,"Falling back on language",a),n[a]):n[t]?(console.warn("Dsi18n: missing translations for locale",e,"Falling back to",t),n[t]):(console.error("Dsi18n: missing translations for locale",e,"no fallback available for fallback",t),{})};exports.Dsi18nContext=Dsi18nContext,exports.Dsi18nProvider=Dsi18nProvider,exports.default=Dsi18nProvider,exports.useTranslation=useTranslation;
