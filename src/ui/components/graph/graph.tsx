import { parseISO,format } from "date-fns";

import { Chart } from "../chart";

// Dynamically import ApexCharts with SSR disabled
interface Comment {
  username: string;
  created_at: string;
}

interface GraphState {
  options: any;
  series: any[];
}

interface GraphFormatProps {
  comments: Comment[];
  state: GraphState;
  setsort: (value: string) => void;
  title: string;
}
export const GraphFormat = ({ comments, state, setsort, title }: GraphFormatProps) => {
    return (
     <div>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">{title} Activity</h2>
            <p className="text-sm text-gray-500">User interaction patterns</p>
          </div>
          <select
            className="border rounded p-1"
            onChange={(e) => setsort(e.target.value)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          height={320}
        />
        {/* Recent Comments List */}
        <div className="mt-4 border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Recent {title}</h3>
          <div className="max-h-40 overflow-y-auto">
            {comments.length>0 ? comments.map((person: any, index: number) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-700">{person.username}</span>
                <span className="text-xs text-gray-500">
                  {format(parseISO(person.created_at), 'MMM dd, yyyy')}
                </span>
              </div>
            )):<div>No data Found</div>}
          </div>
        </div>
        </div>
    );
  };