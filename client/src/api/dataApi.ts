export const submitData = async (data: unknown) => {
    const res = await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  
    if (!res.ok) {
      throw new Error("Failed to submit data");
    }
  
    return res.json();
  };