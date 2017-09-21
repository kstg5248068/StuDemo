export default class ArrayUtils {
    /**
     * 更新数组,有则删除，无则增加
     * @param array
     * @param item
     */
    static updateArray(array, item) {
        for (let i = 0, len = array.length; i < len; i++) {
            var temp = array[i];
            if (temp === item) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    /**
     * 克隆一个数组
     * @param from
     * @returns {Array}
     */
    static clone(from) {
        if (!from) return [];
        let newArray = [];
        for (let i = 0, l = from.length; i < l; i++) {
            newArray[i] = from[i];
        }
        return newArray;
    }

    /**
     * 判断两个数组元素是否一一对应
     * @param arr1
     * @param arr2
     * @returns {boolean}
     */
    static isEqual(arr1, arr2) {
        if (!(arr1 && arr2)) return false;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0, l = arr2.length; i < l; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    /**
     * 移除指定元素
     * @param arr1
     * @param item
     */
    static remove(arr1, item) {
        if (!arr1) return;
        for (let i = 0, l = arr1.length; i < l; i++) {
            if (arr1[i] === item) {
                arr1.splice(i, 1);
            }
        }

    }
}