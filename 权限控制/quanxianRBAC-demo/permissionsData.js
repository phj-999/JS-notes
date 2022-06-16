const userSafetyInspector = {
    name: "美国安全检查员",
    permissions: ["read:stats"],
    nationality: "USA"
};

const userNKScientist = {
    name: "朝鲜反应堆管理者",
    permissions: [
        "read:stats",
        "control:reactor",
        "control:emergencyalert",
        "write:hourlychecks"
    ],
    nationality: "North Korea"
};

const  userPermissions = [
    "read:stats",
    "control:reactor",
    "control:emergencyalert",
    "write:hourlychecks"
  ]

export { userSafetyInspector, userNKScientist, userPermissions}