import "little-state-machine";

declare module "little-state-machine" {
    interface GlobalState {
        performance: {
            venuename: string,
            stagename: string,
            stagename2: string,
            staffname: string,
            showname: string,
            showdate: string,
            showtime: string,
            showtime2: string,
      }
        devices: {
            controller_id: number;
            glasses_id: number;
            status: string;
            issue_time: string;
            return_time: string;
            ticket_id: string;
            notes: string;
    };
  }
}
