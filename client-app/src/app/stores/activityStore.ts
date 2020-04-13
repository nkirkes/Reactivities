import { observable, action } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable loadingInitial = false;

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
        const activities = await agent.Activities.list(); // TODO: what is this doing?
        activities.forEach((activity) => {
            activity.date = activity.date.split(".")[0];
            this.activities.push(activity);
        });
    } catch (error) {
        console.log(error);
    } finally {
        this.loadingInitial = false;
    }
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
