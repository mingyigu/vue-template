<font color="blue">util.md 书写规则：需要包含：功能说明、函数名、参数、返回值、默认值、类型、是否必填和相应的 demo</font>

<hr>

##### parseTime(time, cFormat='{y}-{m}-{d} {h}:{i}:{s}')

解析字符串的时间

**参数**

> time (Object|String|Number)：需要解析的时间 必填

> cFormat (String)：返回时间的格式

**返回**

> (String | Null)：返回对应的时间

**Demo**

```javascript
parseTime(1571911189455, '{yyyy}-{m}-{d}') //结果：2019-10-24
parseTime(new Date(), '{yyyy}-{m}-{d}  {h}:{i}:{s}') //结果：2019-10-24 17:26:33
```

<hr>

##### formatTime(time, option)

根据时间戳计算多久之前

**参数**

> time (Number)：需要解析的时间 必填

> option (String)：返回时间的格式

**返回**

> (String)：返回对应的间隔时间

**Demo**

```javascript
formatTime(1571911189455, '{yyyy}-{m}-{d}') //结果：17分钟前
```

<hr>

##### param2Obj(url)

将 url 中"?"后面的参数转换成 json 对象

**参数**

> url (String)：需要转换的 url 必填

**返回**

> (Object)：返回对应的 json 对象

**Demo**

```javascript
param2Obj('http://www.baidu.com?name=xiaoming&age=22&sex=boy')
//结果： {name: 'xiaoming', age: 22, sex: 'boy'}
```

<hr>
