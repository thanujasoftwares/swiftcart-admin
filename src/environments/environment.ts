// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  title: "StoreFront - Admin",
  menuitems:[
    {
      name:'Dashboard',
      path:'/dashboard',
      icon:'fa fa-dashboard'
    },
    {
      name:'Orders',
      path:'/orders',
      icon:'fa fa-shopping-bag'
    },
    {
      name:'Products',
      path:'/products',
      icon:'fa fa-tags'
    },
    {
      name:'Shipping',
      path:'/shipping',
      icon:'fa fa-truck'
    },
    {
      name:'Customers',
      path:'/customers',
      icon:'fa fa-users'
    },    
    {
      name:'Support',
      path:'/support',
      icon:'fa fa-support'
    },
    {
      name:'Control Panel',
      path:'/settings',
      icon:'fa fa-gears'
    }
  ],
  api:{
    'products':{
      'url':'http://localhost:3000/api/products'
    },
    'menu':{
      'url':'http://localhost:3000/api/menu'
    }    
  }
};
