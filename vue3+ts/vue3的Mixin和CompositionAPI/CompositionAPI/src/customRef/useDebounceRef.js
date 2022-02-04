import { customRef } from "vue";

// 自定义ref
export default function (value, delay = 300) {
  let timer = null;
  return customRef((track, trigger) => {
    return {
      get() {
        track(); //track()决定什么时候搜集依赖
        return value;
      },
      set(newValue) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          value = newValue;
          trigger(); //tigger()表示触发更新
        }, delay);
      },
    };
  });
}
