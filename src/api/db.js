export class Storage {
    constructor(key) {
        this.storage_key = key
        this.data = localStorage.getItem(key)
            ? JSON.parse(localStorage.getItem(key))
            : []
    }
    getAllItems() {
        return this.data
    }
    getItembyId(id) {
        return this.data.find((item) => item.id === id)
    }
    addItem(item) {
        this.data.push(item)
        localStorage.setItem(this.storage_key, JSON.stringify(this.data))
    }
    updateItem(id, item) {
        let index = this.data.findIndex((item) => item.id === id)
        this.data[index] = item
        localStorage.setItem(this.storage_key, JSON.stringify(this.data))
    }
    removeItem(key) {
        this.data = this.data.filter((item) => item.id !== key)
        localStorage.setItem(this.storage_key, JSON.stringify(this.data))
    }
}
