
export function getTokenAndUser(param: string): { token: string, user: { id: number, name: string, email: string } } {
    const token = param.split(',')[0].split('=')[1];
    const userString = param.split(',')[1].split('=')[1];
    const user = JSON.parse(userString);
  
    return { token, user };
  }


  export function extractMessage(jsonStr: string): any | null {
    try {
        const obj = JSON.parse(jsonStr);
        return obj;
    } catch (error) {
        console.error("Error converting JSON to object:", error);
        return null;
    }
}
