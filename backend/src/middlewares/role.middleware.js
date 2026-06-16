const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized.",
      });
    }

    if (!req.user.role.includes(roles)) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }
    next();
  };
};

module.exports = authorizeRoles;
