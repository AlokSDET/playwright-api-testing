export default class NewUser {
    private name: string;
    private email: string;
    private location: string;

    public getName(): string {
        return this.name;
    }
    public getEmail(): string {
        return this.email;
    }
    public getLocation(): string {
        return this.location;
    }

    public setName(name: string): void {
        this.name = name;
    }
    public setEmail(email: string): void {
        this.email = email;
    }
    public setLocation(location: string): void {
        this.location = location;
    }
}
