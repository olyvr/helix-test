/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable */
const { Runtime } = require('@adobe/htlengine');

function run(runtime) {
  const $ = {
    col: runtime.col,
    exec: runtime.exec.bind(runtime),
    xss: runtime.xss.bind(runtime),
    listInfo: runtime.listInfo.bind(runtime),
    use: runtime.use.bind(runtime),
    slyResource: runtime.resource.bind(runtime),
    call: runtime.call.bind(runtime),
    template: runtime.template.bind(runtime),
    dom: runtime.dom,
  };


  return runtime.run(function* () {

    let content = runtime.globals["content"];
    let request = runtime.globals["request"];
    let context = runtime.globals["context"];
    let payload = runtime.globals["payload"];
    const global = runtime.globals;

    let $t, $n = $.dom.start();
    const var_0 = content["document"]["body"];
    $.dom.append($n, var_0);
    $.dom.text($n,"\n");
    return $.dom.end();

  });
}

module.exports.main = async function main(context) {
  const global = Object.assign({}, context);
  global.payload = new Proxy(global, {
      get: function(obj, prop) {
        process.emitWarning(`payload.${prop}: The use of the global 'payload' variable is deprecated in HTL. use 'context.${prop}' instead.`);
        return obj[prop];
      },
  });
  global.context = context;
  const runtime = new Runtime();
  runtime.setGlobal(global);
  if (context.content && context.content.document && context.content.document.implementation) {
    runtime.withDomFactory(new Runtime.VDOMFactory(context.content.document.implementation));
  }
  return await run(runtime);
};
//# sourceMappingURL=plain_html.script.js.map
