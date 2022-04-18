(function xx() {
    let web : String = "hello world"
    console.log(web);
})()
//获取组件中对应的类型 这样可以拿到对应组件中的实列方法或属性等
//<InstanceType<typeof LoginAccount>>
//vue3中
const formRef = ref<InstanceType<typeof ElForm>>()
const loginAction = () => {formRef.value?.validate((valid) => {if (valid) {console.log('zhixing') }})}
const accountRef = ref<InstanceType<typeof LoginAccount>>()
accountRef.value?.loginAction()