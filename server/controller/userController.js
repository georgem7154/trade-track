let jobs = [{ name: "george" }];
export const getAllUsers = async (req, res) => {
  if (!jobs) {
    res.status(404).json({ msg: "no jobs found" });
  }
  res.status(200).json({ jobs });
};
export const createUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ msg: "no jobs found" });
  }
  jobs.push({ name: id });
  res.status(200).json({ jobs });
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ msg: "no jobs found" });
  }
  const job = jobs.filter((job) => job.name !== id);
  jobs = job;
  res.status(200).json({ jobs });
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name || !id) {
    return res.status(404).json({ msg: "values missing" });
  }
  const job = jobs.find((job) => job.name == id);
  if(!job){
    return res.status(404).json({ msg: "no matching jobs" });
  }
  job.name = name;
  res.status(200).json({ jobs });
};
