import Dexie from 'dexie';

export class Location {

    constructor() {
        const db = new Dexie("SocialDB");

        db.version(2)
        .stores({
            mapinfo: "query"  // 一番最初に来るnameがキー。ageがインデックス。
        });
        this.db = db;
    }

    add_to_db(query, lat, lng) {
        this.db.mapinfo
        // データ挿入(Promiseが返る)
        .put({
            query: query,
            lat: lat,
            lng: lng,
        })
        // エラー処理
        .catch((error)=>{
            console.error(error);
        });
    }

    get_from_db(query) {
        this.db.mapinfo.get(query)    // データを取得(Promiseが返る)
        // データ処理
        .then((res)=>{
            console.log(res);
            console.log("Getting from Database.Location is successed.");
            return res;
        })
        // エラー処理
        .catch((error)=>{
            console.error(error);
            console.error("Cannot get data from Database.Location.");
        });
        return {lat: 10.0, lng: 10.0}
    }
}