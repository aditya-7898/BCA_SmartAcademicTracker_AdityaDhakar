const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check user exists
      if (!req.user) {
        return res.status(401).json({
          msg: "Unauthorized ❌",
        });
      }

      // Check role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          msg: "Access Denied ❌",
        });
      }

      next();

    } catch (err) {
      res.status(500).json({
        msg: "Role check failed",
        error: err.message,
      });
    }
  };
};

module.exports = roleMiddleware;