import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('/Users/gaoguoxing/Documents/code/ant-design-pro/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/gaoguoxing/Documents/code/ant-design-pro/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/gaoguoxing/Documents/code/ant-design-pro/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('/Users/gaoguoxing/Documents/code/ant-design-pro/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('/Users/gaoguoxing/Documents/code/ant-design-pro/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/gaoguoxing/Documents/code/ant-design-pro/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/gaoguoxing/Documents/code/ant-design-pro/src/models/user.js').default) });
