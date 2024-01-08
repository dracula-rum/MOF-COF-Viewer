declare module '3Dmol.js' {
    const content: any
    /// 这里的 content 可以根据自己的需要，添加需要的类型，这的话可以让 ts 更好的提示
    type content = {
      test: string
    }

    export = content
}
    // 直接在ts文件中引入js文件也会报红，添加这行代码解决

declare module '.../public/3Dmol.js'