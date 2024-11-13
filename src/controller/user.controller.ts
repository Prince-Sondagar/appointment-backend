
export const getCurrentUser = (req: any, res: any) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized user" })
        }
        return res.status(200).json({ user });
    } catch (error: any) {
        res.status(500).json({ message: error?.message })
    }
}