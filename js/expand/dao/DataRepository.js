import {
    AsyncStorage
} from 'react-native';
import  GitHubTrending from 'GitHubTrending'
export const FLAG_STORAGE={flag_popular:'popular',flag_trending:'trending'};
export default class DataRepository {
    constructor(flag){
        this.flag=flag;
        if(flag===FLAG_STORAGE.flag_trending)this.trending=new GitHubTrending()
    }
    saveRepository(url, items, callback) {
        if (!url || !items) return;
        let wrapData;
        wrapData = {
            items: items,
            update_date: new Date().getTime()
        };
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
    }


    fetchRepository(url) {
        return new Promise((resolve, reject) => {

            this.fetchLocalRepository(url)
                .then((wrapData) => {
                    if (wrapData) {
                        resolve(wrapData, true);
                    } else {
                        this.fetchNetRepository(url)
                            .then((data) => {
                                resolve(data);
                            }).catch((error) =>
                            reject(error))
                    }
                }).catch(error => {
                console.log(error);
                this.fetchNetRepository(url)
                    .then((data) => {
                    resolve(data)
                }).catch((error) => {
                    reject(error)
                })
            })
        });

    }


    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            if(this.flag!==FLAG_STORAGE.flag_trending) {

                fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        if (result) {
                            resolve(result.items);
                            this.saveRepository(url, result.items)

                        } else {
                            reject(new Error('responseData is Null'));

                        }

                    })
                    .catch(error => reject(error))
            }else{
                this.trending.fetchTrending(url)
                    .then(items=>{
                        if(!items){
                            reject(new Error('responseData is Null'));

                        }else {
                            resolve(items);
                            this.saveRepository(url,items)
                        }
                    }).catch(e=>{
                        reject(e)
                })
            }
        })
    }

    fetchLocalRepository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (error) {
                    reject(error);
                    console.log(error)
                } else {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.log(e);
                    }
                }
            })

        })
    }

    /**
     *  检查时间戳是否过时
     * @param longTime
     * @returns {boolean} true 不需要更新 false 需要更新
     */
    checkDate(longTime){
        let cDate=new Date();
        let tDate=new Date();
        tDate.setTime(longTime);
        if(cDate.getMonth()!==tDate.getMonth())return false;
        if(cDate.getDay()!==tDate.getDay())return false;
      if(cDate.getHours()-tDate.getHours()>4)return false;
       // if(cDate.getMinutes()-tDate.getMinutes()>1)return false;
        return true;

    }
}